import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlay,
    faPause,
    faForwardStep,
    faBackwardStep,
} from "@fortawesome/free-solid-svg-icons";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import cls from './PlayerControls.module.scss'
import {classNames} from "shared/lib/classNames";

interface IPlayerControls{
    SkipSong:(value:boolean | void)=>void
    isPlaying:boolean
    setIsPlaying:Dispatch<SetStateAction<boolean>>
    duration:string
    currTime:{min:string,sec:string}
    seconds:number
    active:HTMLAudioElement | null
    initActive:()=>Promise<boolean>
}

export const PlayerControls = (props:IPlayerControls) => {
    const {SkipSong,initActive,setIsPlaying,isPlaying,duration,currTime,seconds,active} = props
    const [time,setTime] = useState(0)
    useEffect(()=>{
        setTime(seconds)
    },[seconds])
    return (
        <div className={cls.Container}>
            <button
                className={classNames(cls.PlayBtn, {[cls.Active]: isPlaying}, [])}
                onClick={() => {
                    initActive().then((isActive:boolean) => {
                        if(isActive) {
                            setIsPlaying(!isPlaying)
                        }
                    })
                }}
            >
                <FontAwesomeIcon icon={isPlaying ? faPause : faPlay}/>
            </button>
            <button className={cls.SkipBtn} onClick={() => SkipSong(false)}>
                <FontAwesomeIcon icon={faBackwardStep}/>
            </button>
            <button className={cls.SkipBtn} onClick={() => SkipSong()}>
                <FontAwesomeIcon icon={faForwardStep}/>
            </button>
            <div className={cls.Time}>
                {Number(currTime.min) > 9 ? Number(currTime.min) : `0${currTime.min}` }:{Number(currTime.sec) > 9 ? Number(currTime.sec) : `0${currTime.sec}` }
            </div>
            <input onChange={(e) => {
                setTime(Number(e.target.value))
                if(active && active?.currentTime){
                    active.currentTime = Number(e.target.value)
                }
            }} className={cls.Range} type="range" value={time} min={0} max={Number(duration) * 1000}/>
            <div className={cls.Time}>{duration}</div>
        </div>
    );
}