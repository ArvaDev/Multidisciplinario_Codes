import './ledControll.css';
import LedBtn from './ledBtn/ledBtn';
import { useState } from 'react';

export default function LedControll({leds}) {
    console.log(leds)
    const [activeLedIndex, setActiveLedIndex] = useState(null);

    const toggleLed = (index) => {
        setActiveLedIndex(index === activeLedIndex ? null : index);

    };
    return (
        <div className='LedControllClass card'>
            <p className='t nC'>Panel</p>
            <div className='Leds'>
                {[0, 1, 2].map((index) => (
                    <LedBtn
                        isOn={index === activeLedIndex}
                        onClick={() => toggleLed(index)}
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
