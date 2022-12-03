import Styles from '../styles/Header.module.css';
import {useState, useEffect} from 'react'

export default function Header() {
    const [currentTime, setCurrentTime] = useState('00:00');
    const [currentDate, setCurrentDate] = useState('');

    const currentDateAndTime = () => {
        const date = new Date();
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        setCurrentTime(`${hours}:${minutes}`)
        setCurrentDate(
            new Date().toLocaleDateString("ko-KR", {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric",
            })
        )
    }
    useEffect(() => {
        setInterval(currentDateAndTime, 1000)
    },[])

  return (
    <div className={Styles.wrap}>
        <div className={Styles.leftWrap}>
            <span className={Styles.time}>{currentTime}</span>
            <span className={Styles.date}>{currentDate}</span>
        </div>
    </div>
  )
}
