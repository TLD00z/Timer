import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [timer, setTimer] = useState(0)
  const [isStart,setIsStart] = useState(false)
  const [isStop, setIsStop] = useState(false)
  const [lapList, setLapList] =useState([])
  const increment = useRef(null)
  


  const handleStart = () => { 
    setIsStart(true)
    setIsStop(true)
    increment.current = setInterval(() =>{
      setTimer((timer) => timer + 1  )
    },1000 ) //1000 ms = 1 second
  }

  const handleStop = () =>{
    clearInterval(increment.current)
    setIsStop(false)
    
  }
  
  const handleReset= ()=>{
    clearInterval(increment.current)
    setIsStart(false)
    setIsStop(false)
    setTimer(0)
    setLapList([])
  }
  const handleLap = ()=>{
     setLapList([...lapList , displayTimer()])
  }

  const DisplayLap=({ laps })=>{
    return (
      <><hr></hr>
        <ul className='laps-table'>
          {laps.map((lap,index)=>(
            <li key={index}> lap{index+1} : {lap}</li>
          ))}
        </ul>
      </>
    )
  }
  const displayTimer= ()=>{
    const seconds = timer
    const getSeconds = `0${(seconds % 60)}`.slice(-2)
    const minutes = `${Math.floor(timer / 60)}`
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

    return `${getHours} : ${getMinutes} : ${getSeconds}`
  }

  return (
    <div className='app'>
      <p className='time-display'>{displayTimer()}</p>
      <div className='bnt-box'> 
        <button className="bnt" onClick={handleStop} disabled={!isStart || !isStop}>Stop</button>
        <button className="bnt" onClick={handleStart} disabled={isStart && isStop } >Star</button>
        <button className="bnt" onClick={handleReset} disabled={!isStart} >Reset</button>
        <button className='bnt' onClick={handleLap} >Lap</button>
      </div>
      
      <div className='lap-title'>
        <p>Lap Time</p>
      </div>
      
      <DisplayLap laps={lapList} />
    </div>
  );
}

export default App;
