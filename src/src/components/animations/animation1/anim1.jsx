import './anim1.css';
import Modal from '../../modals/modal';
import { interval } from '../../../utils/interval';
import { useState } from 'react';
export const Anim1 = ({ alertMess, color1, color2, scale, limitMin, limitMax, seed }) => {
    const [mP, setMP] = useState(false);
    const inter = interval(scale, limitMin, limitMax)
    const back = {
        background: `linear-gradient(
                    ${inter ? '#ff5f5f' : color1},
                    ${inter ? '#ff2f2f' : color2}`,
        borderColor: color1
    };
    const isE = () => { setMP(true)  }
    const isO = () => { setMP(false) }
    return (
        <div onMouseEnter={isE} onMouseLeave={isO} 
            className="Anim1Class" style={{ border: `${interval(scale, limitMin, limitMax) ? '#ff5f5f' : back.borderColor} solid 1px` }}>
            <div className='MainCont'>
                <div className='Container'>
                    <div style={{ background: back.background }} className='border'></div>
                </div>
            </div>
            {mP && <Modal message={alertMess} state={inter}/> }
            <svg>
                    <filter id="turbulence">
                        <feTurbulence type="turbulence" seed={seed} baseFrequency="0.03" numOctaves='4' result="turbulence">
                            <animate attributeName="baseFrequency" values="0.01;0.02;0.01" dur="60s" repeatCount="indefinite" />
                        </feTurbulence>
                        <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="50" />
                    </filter>
                <rect width="100%" height="100%" filter="url(#turbulence)" />
            </svg>
        </div>
    );
};
