import React, { useState, useEffect } from 'react'

function Timer({stamp, action}) {
    let [time, setTime]=useState(stamp)
    useEffect(()=>{
        let interval=setInterval(() => {
            // console.log("je compte toujours")
            if(time<=1000) action()
            setTime(time-1000)
        }, 1000);
        return ()=>{
            clearInterval(interval)
        }
    })
    const convertToTime=(t)=>{
        let min=Math.floor(t/(60*1000))
        let sec=Math.floor((t%(60*1000))/1000)
        return <> 0{min} : {sec>=10 ? sec : "0"+sec} </>
    }
    return (
        <div className="timer">
            {convertToTime(time)} 
        </div>
    )
}

export default Timer
