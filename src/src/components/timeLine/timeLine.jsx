import './timeLine.css';
import DataCard from './dataCard/dataCard';
import { temporalData } from '../../../data/data';

export default function TimeLine() {
    const date = new Date();
    const tempData = temporalData.temperatura.hourData;
    const humeData = temporalData.humedad.hourData;
    const currentHour = date.getHours();
    const nextHour = (currentHour + 1) >= 24 ? '00' : String(currentHour + 1).padStart(2, '0');
    return (
        <div className="TimeLineClass card">
            <div className='titles nC'>
                <p>Temperatura</p>
                <p>Humedad</p>
            </div>
            <div className='line'>
                <div className='Headers nC'>
                    <p className='t'>{String(currentHour).padStart(2, '0') + ":00"}</p>
                    <p className='t'>Temperatura y Humedad</p>
                    <p className='t'>{nextHour + ":00"}</p>
                </div>
                <div className='time'>
                    <div className='tempTime par'>
                        {tempData.map((item, index) => (
                            <DataCard errorMinLimit={28} errorMaxLimit={40} maxLimit={40} index={
                                currentHour + ":" + String(((index) * 2) > 9 ? ((index) * 2) : "0" + ((index) * 2))
                            } color={'#ff8929'} porsent={item} cont="°C" />
                        ))}
                    </div>
                    <div className='division'></div>
                    <div className='humeTime par'>
                        {humeData.map((item, index) => (
                            <DataCard 
                                errorMinLimit={0} errorMaxLimit={25}
                                maxLimit={100} index={
                                currentHour + ":" + String(((index) * 2) > 9 ? ((index) * 2) : "0" + ((index) * 2))
                            } color={'#32aff3'} porsent={item} cont="%" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
