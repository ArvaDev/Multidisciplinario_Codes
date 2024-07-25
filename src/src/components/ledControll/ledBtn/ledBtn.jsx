import './ledBtn.css';
import { BsFillLightbulbFill, BsFillLightbulbOffFill } from "react-icons/bs";

export default function LedBtn({ isOn, onClick }) {
    const btnClass = isOn ? 'on' : 'off';
    console.log(isOn)
    return (
        <div onClick={onClick} className={`LedBtnClass ${btnClass}`}>
            {!isOn ?
                <BsFillLightbulbOffFill className='bulb icon' />
                :
                <BsFillLightbulbFill className='bulb icon' />}
        </div>
    );
}
