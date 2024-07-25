import './ledControll.css';
import LedBtn from './ledBtn/ledBtn';
import { useState } from 'react';
import axios from 'axios';

export default function LedControll({ leds }) {
    const [ledStates, setLedStates] = useState({
        Uv: false,
        visible: false,
        If: false
    });
    const toggleLed = (index) => {
        const newLedStates = {
            Uv: false,
            visible: false,
            If: false
        };
        if (index === 'Uv') newLedStates.Uv = !ledStates.Uv;
        if (index === 'visible') newLedStates.visible = !ledStates.visible;
        if (index === 'If') newLedStates.If = !ledStates.If;

        setLedStates(newLedStates);
        axios.post('http://52.72.151.221/events', newLedStates);
    };

    return (
        <div className='LedControllClass card'>
            <p className='t nC'>Panel</p>
            <div className='Leds'>
                {['Uv', 'visible', 'If'].map((key) => (
                    <LedBtn
                        key={key}
                        isOn={ledStates[key]}
                        onClick={() => toggleLed(key)}
                    />
                ))}
            </div>
            <div className='titles'>
                <p className={`nC ${leds?.UV ? 'on' : 'off'}`}>UV</p>
                <p className={`nC ${leds?.IF ? 'on' : 'off'}`}>Infrarrojo</p>
                <p className={`nC ${leds?.visible ? 'on' : 'off'}`}>Luz normal</p>
            </div>
        </div>
    );
}
