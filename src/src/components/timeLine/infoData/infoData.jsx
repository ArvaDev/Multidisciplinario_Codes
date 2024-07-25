import './infoData.css';
export default function InfoData({porsent, index}) {
    return (
        <div className='InfoDataClass nC'>
            <p>{porsent}</p>
            <p>{index}</p>
        </div>
    );
}
