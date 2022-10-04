import React, { useEffect, useState } from 'react'
import "../Styles/Timer.css"

export default function Timer({ isActive }) {

  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval;
    if (isActive) {
      setTime(0);
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!isActive) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive])

  return (
    <div className='timer'>
      <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
      <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
    </div>
  )
}
