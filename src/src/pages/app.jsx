import './app.css';
import { temporalData } from '../../data/data';
import io from 'socket.io-client';
import CardM from '../components/card/cardM';
import TimeLine from '../components/timeLine/timeLine';
import LedControll from '../components/ledControll/ledControll';
import Display from '../components/display/display';
import History from '../components/history/history';
import { useEffect, useState } from 'react';
export default function App() {
    const [data, setData] = useState();
    useEffect(() => {
        const socket = io('http://52.70.35.226', {
            extraHeaders: {
                'Authorization': '123ADWAWDAWDQWDAD33'
            }
        });

        socket.on('connect', () => {
            console.log('Conectado al servidor');
        });

        socket.on('sensors', (data) => {
            setData(data)
        });

        socket.on('connect_error', (err) => {
            console.error('Error de conexión:', err.message);
        });

        socket.on('disconnect', () => {
            console.log('Desconectado del servidor');
        });
    }, [])
    console.log(data)
    return (
        <div className='AppClass'>
            <CardM limitMin={0} limitMax={20} max={100}
                alertMess="La humedad esta disminuyendo"
                num={data?.humedad} title={temporalData.humedad.title}
                text={temporalData.humedad.text} />
            <CardM limitMin={32} limitMax={40} max={40}
                alertMess="La temperatura esta aumentando" comp="°C"
                num={data?.temperatura} title={temporalData.temperatura.title}
                text={temporalData.temperatura.text} />
            <div className='containerD'>
                <Display level={data?.device.level} irrigation={data?.device.bomba} fan={data?.device.fan} light={data?.device.ligth} />
                <LedControll leds={data?.device?.leds} />
            </div>
            <TimeLine />
        </div>
    );
}