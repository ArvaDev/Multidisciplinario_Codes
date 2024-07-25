import React from 'react';
import './porsent.css';
import { randomColor } from '../../utils/randomColor';
import { interval } from '../../utils/interval';

export default function Porsent({ porsent, limitMin, limitMax, composition = "", max}) {
    const inter = interval(porsent, limitMin, limitMax);
    return (
        <div className='PorsentClass'>
            <div className='internal' />
            <svg width="100" height="100" viewBox="0 0 100 100">
                <circle className='Back' r="42%" cy="50%" cx="50%" />
                <circle stroke={!inter ? randomColor() : "#ff5f5f"} className='porsent' r="42%" cy="50%" cx="50%" 
                        strokeDasharray={`${porsent} 100`} pathLength={`${max}`}/>
                <text className='svgText' x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">{porsent}{composition}</text>
            </svg>
        </div>
    );
}
