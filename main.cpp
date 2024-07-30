#include "DHTesp.h"
#include "WiFi.h"
#include "PubSubClient.h"
#include "ArduinoJson.h"
#include <algorithm>

// Pines de entrada =================
const int PIN_LIGHT_SENSOR = 32;
const int PIN_DHT_SENSOR = 33;
const int PIN_WATER_LEVEL = 35;

// Outputs ==========================
const int PIN_WATER_BOMB = 22;
const int PIN_FAN = 23;

// Pines de salida para LEDs ========
const int LED_PIN_1 = 26;
const int LED_PIN_2 = 14;
const int LED_PIN_3 = 5;

// WiFi =============================
const char* ssid = "Lap-top_A";
const char* pass = "ochovecesocho";

// MQTT =============================
WiFiClient espClient;
PubSubClient client(espClient);
const char* mqttServer = "34.197.63.247";
const int mqttPort = 1883;
const char* mqttUser = "guest";
const char* mqttPassword = "guest";

// DHT ==============================
DHTesp dht;

// Temporizadores ===================
const unsigned long INTERVAL = 60 * 1000;
const unsigned long ACTIVE_DURATION = 3 * 1000;
unsigned long previousMillis = 0;
unsigned long activeStartMillis = 0;
bool bombState = false;

// Variables para el filtrado =================
const int numReadings = 10;
float humidityReadings[numReadings];
float temperatureReadings[numReadings];
int readingIndex = 0;
const float threshold = 0.5;
const unsigned long updateInterval = 5000;
unsigned long lastUpdateMillis = 0;
float lastHumidity = 0;
float lastTemperature = 0;

// Setup
void setup() {
  Serial.begin(115200);
  prepareDHT();
  connectWiFi();
  connectMQTT();
  client.setCallback(callback);
  client.subscribe("sensor/leds");

  pinMode(PIN_WATER_BOMB, OUTPUT);
  pinMode(PIN_FAN, OUTPUT);
  pinMode(LED_PIN_1, OUTPUT);
  pinMode(LED_PIN_2, OUTPUT);
  pinMode(LED_PIN_3, OUTPUT);

  // Inicializa los arrays de lecturas
  std::fill_n(humidityReadings, numReadings, 0);
  std::fill_n(temperatureReadings, numReadings, 0);

  previousMillis = millis();
}

// Preparación del sensor DHT ==============================
void prepareDHT() {
  pinMode(PIN_DHT_SENSOR, INPUT_PULLDOWN);
  dht.setup(PIN_DHT_SENSOR, DHTesp::DHT11);
}

// Conexión WiFi =============================
void connectWiFi() {
  WiFi.begin(ssid, pass);
  Serial.println();
  Serial.print("Conectando a ");
  Serial.println(ssid);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi conectado");
  Serial.println("Dirección IP obtenida: ");
  Serial.println(WiFi.localIP());
}

// Conexión MQTT =============================
void connectMQTT() {
  client.setServer(mqttServer, mqttPort);
  while (!client.connected()) {
    Serial.println("Connecting to MQTT...");

    if (client.connect("ESP32Client", mqttUser, mqttPassword)) {
      Serial.println("Conectado");
      client.subscribe("sensor/leds");
    } else {
      Serial.print("failed with state ");
      Serial.print(client.state());
      Serial.println(" Intentando de nuevo en 5 segundos");
      delay(5000);
    }
  }
}

// Loop principal
void loop() {
  if (!client.connected()) {
    connectMQTT();
  }
  dhtLoop();
  waterLevelLoop();
  lightDetector();
  manageWaterBomb();
  client.loop();
  delay(2000);
}

// Función para manejar el estado de la bomba de agua
void manageWaterBomb() {
  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis >= INTERVAL) {
    previousMillis = currentMillis;
    bombState = true;
    digitalWrite(PIN_WATER_BOMB, HIGH);
    activeStartMillis = currentMillis;
  }
  if (bombState && (currentMillis - activeStartMillis >= ACTIVE_DURATION)) {
    bombState = false;
    digitalWrite(PIN_WATER_BOMB, LOW);
  }

  char buffer[256];
  StaticJsonDocument<256> doc;
  doc["bomba"] = bombState;
  size_t len = serializeJson(doc, buffer);
  client.publish("sensor/bomba", buffer, len);
}

// Loop del sensor DHT =============================
void dhtLoop() {
  float humidity = dht.getHumidity();
  float temperature = dht.getTemperature();

  // Agregar nuevas lecturas
  humidityReadings[readingIndex] = humidity;
  temperatureReadings[readingIndex] = temperature;
  readingIndex = (readingIndex + 1) % numReadings;

  // Ordenar y calcular la mediana
  std::sort(humidityReadings, humidityReadings + numReadings);
  std::sort(temperatureReadings, temperatureReadings + numReadings);
  float medianHumidity = humidityReadings[numReadings / 2];
  float medianTemperature = temperatureReadings[numReadings / 2];

  // Aplicar el umbral de cambio
  if (abs(medianHumidity - lastHumidity) > threshold || abs(medianTemperature - lastTemperature) > threshold) {
    lastHumidity = medianHumidity;
    lastTemperature = medianTemperature;
    lastUpdateMillis = millis();

    char buffer[256];
    StaticJsonDocument<256> doc;
    doc["humedad"] = (int) medianHumidity;
    doc["temperatura"] = (int) medianTemperature;
    if (medianTemperature >= 28) {
      onFan(true);
    } else {
      onFan(false);
    }
    size_t len = serializeJson(doc, buffer);
    client.publish("sensor/Tem-Hum", buffer, len);
  }
}

// Detector de luz =============================
void lightDetector() {
  int valorAdc = analogRead(PIN_LIGHT_SENSOR);
  bool isDay = valorAdc != 4095;

  char buffer[256];
  StaticJsonDocument<256> doc;
  doc["LightSensor"] = isDay;
  size_t len = serializeJson(doc, buffer);
  client.publish("sensor/LightSensor", buffer, len);
}

// Loop del nivel de agua =============================
void waterLevelLoop() {
  int valueAdc = analogRead(PIN_WATER_LEVEL);
  bool isFull = valueAdc == 4095;

  char buffer[256];
  StaticJsonDocument<256> doc;
  doc["WaterLevel"] = isFull;
  size_t len = serializeJson(doc, buffer);
  client.publish("sensor/WaterLevel", buffer, len);
}

// Funciones internas
void onFan(bool fan) {
  char buffer[256];
  StaticJsonDocument<256> doc;
  digitalWrite(PIN_FAN, fan ? HIGH : LOW);
  doc["FanOn"] = fan;
  size_t len = serializeJson(doc, buffer);
  client.publish("sensor/Fan", buffer, len);
}

// Callback para manejar mensajes MQTT =============================
void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived on topic: ");
  Serial.println(topic);

  String message;
  for (int i = 0; i < length; i++) {
    message += (char)payload[i];
  }

  // Parse JSON
  DynamicJsonDocument doc(256);
  DeserializationError error = deserializeJson(doc, message);

  if (error) {
    Serial.print("deserializeJson() failed: ");
    Serial.println(error.c_str());
    return;
  }

  // Access JSON values
  if (String(topic) == "sensor/leds") {
    bool led1 = doc["led1"];
    bool led2 = doc["led2"];
    bool led3 = doc["led3"];

    digitalWrite(LED_PIN_1, led1 ? HIGH : LOW);
    digitalWrite(LED_PIN_2, led2 ? HIGH : LOW);
    digitalWrite(LED_PIN_3, led3 ? HIGH : LOW);

    char buffer[256];
    StaticJsonDocument<256> doc;
    doc["visible"] = led1;
    doc["UV"] = led2;
    doc["IF"] = led3;
    size_t len = serializeJson(doc, buffer);
    client.publish("sensor/ledsReturn", buffer, len);
  }
}
