import './ledControll.css';
import LedBtn from './ledBtn/ledBtn';
import { useState } from 'react';

export default function LedControll({ leds }) {
    // Inicializar el estado con un objeto que represente el estado de los LEDs
    const [ledStates, setLedStates] = useState({
        led1: false,
        led2: false,
        led3: false
    });

    // Función para actualizar el estado del LED
    const toggleLed = (index) => {
        const newLedStates = {
            led1: false,
            led2: false,
            led3: false
        };
        if (index === 0) newLedStates.led1 = true;
        if (index === 1) newLedStates.led2 = true;
        if (index === 2) newLedStates.led3 = true;

        setLedStates(newLedStates);
        console.log(newLedStates)

        // Enviar el post con los leds
    };

    return (
        <div className='LedControllClass card'>
            <p className='t nC'>Panel</p>
            <div className='Leds'>
                {[0, 1, 2].map((index) => (
                    <LedBtn
                        isOn={ledStates[`led${index + 1}`]}
                        onClick={() => toggleLed(index)}
                        key={index}
                    />
                ))}
            </div>
            <div className='titles'>
                <p className={`nC ${leds?.IF ? 'on' : 'off'}`}>Infrarrojo</p>
                <p className={`nC ${leds?.UV ? 'on' : 'off'}`}>UV</p>
                <p className={`nC ${leds?.visible ? 'on' : 'off'}`}>Luz normal</p>
            </div>
        </div>
    );
}
