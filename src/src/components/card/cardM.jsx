import './cardM.css';
import { Anim1 } from '../animations/animation1/anim1';
import { randomColor } from '../../utils/randomColor';
import Porsent from '../porsent/porsent';
export default function CardM({ alertMess, num, title, text = "", comp = "%", max, limitMin, limitMax}) {
    return (
        <div className='CardMClass card'>
            <p className='Title nC'>{title}</p>
            <div className='SensorData cont'>
                <Porsent porsent={num} composition={comp} max={max} limitMax={limitMax} limitMin={limitMin}/>
            </div>
            <div className='Info cont'>
                <p>{text}</p>
                <Anim1 seed={Math.floor(Math.random() * 100)} limitMax={limitMax} limitMin={limitMin} alertMess={alertMess} scale={num} color1={randomColor()} color2={randomColor()}/>
            </div>
        </div>
    );
}