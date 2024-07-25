import './display.css';
import { BsFan } from "react-icons/bs";
import { FaSun } from "react-icons/fa";
import { FaWater } from "react-icons/fa";
import { GiPlantWatering } from "react-icons/gi";
export default function Display({fan, light, irrigation, level}) {
    return (
        <div className='DisplayClass card'>
            <p className='title nC'>Control</p>
            <div className='warning'>
                <BsFan fill={fan ? '#ff99fd' : '#787878'} className='displayIcon'/>
                <FaSun fill={light ? '#ffee30' : '#787878'} className='displayIcon'/>
                <GiPlantWatering fill={irrigation ? '#03caff' : '#787878'} className='displayIcon'/>
                <FaWater fill={!level ? '#3280ff' : '#ff4848'} className='displayIcon'></FaWater>
            </div>
        </div>
    );
}