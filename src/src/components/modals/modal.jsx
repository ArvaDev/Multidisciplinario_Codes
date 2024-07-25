import './modal.css';
import { comments } from '../../utils/coments';
import { PiHandWaving } from "react-icons/pi";
import { PiWarning } from "react-icons/pi";
export default function Modal({message, state}) {
    return (
        <div className="Modal">
            <p>{state ? message : comments[Math.trunc(Math.random() * comments.length)]}</p>
            {state ? <PiWarning className='icon'/> : <PiHandWaving className='icon'/>}
        </div>
    );
}