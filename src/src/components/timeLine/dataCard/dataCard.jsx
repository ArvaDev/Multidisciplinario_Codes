import './dataCard.css'
import InfoData from '../infoData/infoData';
import { interval } from '../../../utils/interval';
export default function DataCard({porsent, maxLimit, color, index, cont, errorMinLimit, errorMaxLimit}) {
    let h = ( porsent / maxLimit ) * 100;
    const colorD = interval(porsent, errorMinLimit, errorMaxLimit) ? '#ff5f5f' : color;
    return (
        <div style={{height: `${h}%`, background: colorD}} className="DataCardClass">
            <InfoData porsent={porsent + cont} index={index}/>
        </div>
    );
}