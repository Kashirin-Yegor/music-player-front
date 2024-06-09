import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlay,
    faPause,
    faForwardStep,
    faBackwardStep,
    faRandom,
} from "@fortawesome/free-solid-svg-icons";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import cls from './PlayerControls.module.scss'
import {classNames} from "shared/lib/classNames";
import {Slider} from "@mui/material";
import {VolumeDownRounded, VolumeUpRounded,VolumeMute} from "@mui/icons-material";
import {Tooltip} from "@mui/material";

interface IPlayerControls{
    SkipSong:(value:'next' | 'back')=>void
    isPlaying:boolean
    setIsPlaying:Dispatch<SetStateAction<boolean>>
    duration:string
    durationMax:number
    currTime:{min:string,sec:string}
    seconds:number
    active:HTMLAudioElement | null
    detailsSelect:{
        image?:string
        name?:string
        author?:string
    }
}

export const PlayerControls = (props:IPlayerControls) => {
    const {detailsSelect,SkipSong,setIsPlaying,isPlaying,duration,currTime,seconds,active,durationMax} = props
    const [time,setTime] = useState(0)
    useEffect(()=>{
        setTime(seconds)
    },[seconds])
    const [volume,setVolume] = useState(100)
    const [prevVolume,setPrevVolume] = useState(0)
    return (
        <div className={classNames(cls.Container, {[cls.Visible]: !!active}, [])}>
            <button
                className={classNames(cls.PlayBtn, {[cls.Active]: isPlaying}, [])}
                onClick={() => {
                    setIsPlaying(!isPlaying)
                }}
            >
                <FontAwesomeIcon icon={isPlaying ? faPause : faPlay}/>
            </button>
            <button className={cls.SkipBtn} onClick={() => SkipSong('back')}>
                <FontAwesomeIcon icon={faBackwardStep} style={{width: 20, height: 20}}/>
            </button>
            <button className={cls.SkipBtn} onClick={() => SkipSong('next')}>
                <FontAwesomeIcon icon={faForwardStep} style={{width: 20, height: 20}}/>
            </button>
            <button className={cls.SkipBtn}>
                <FontAwesomeIcon icon={faRandom} style={{width: 20, height: 20}}/>
            </button>
            <div className={cls.Time}>
                {Number(currTime.min) > 9 ? Number(currTime.min) : `0${currTime.min}`}:{Number(currTime.sec) > 9 ? Number(currTime.sec) : `0${currTime.sec}`}
            </div>
            <Slider
                aria-label="time-indicator"
                size="small"
                value={time}
                min={0}
                step={1}
                max={durationMax}
                className={classNames(cls.TrackSlider, {}, [cls.Range])}
                onChange={(_, value) => {
                    setTime(Number(value))
                    if (active && active?.currentTime) {
                        active.currentTime = Number(value)
                    }
                }}
            />
            <div className={cls.Time}>{duration}</div>
            <Tooltip title={
                <div className={cls.VolumeSliderContainer}>
                    <Slider
                        className={classNames(cls.Range, {}, [cls.VolumeSlider])}
                        aria-label="Temperature"
                        orientation="vertical"
                        size="small"
                        // getAriaValueText={valuetext}
                        valueLabelDisplay="auto"
                        min={0}
                        max={100}
                        value={volume}
                        onChange={(_, value) => setVolume(Number(value))}
                    />
                </div>}>
                <button className={cls.SkipBtn} onClick={() => {
                    setPrevVolume(volume)
                    if (volume === 0) {
                        setVolume(prevVolume)
                    } else {
                        setVolume(0)
                    }
                }}>
                    {volume === 0 ? <VolumeMute className={cls.Volume}/> : volume > 0 && volume <= 50 ?
                        <VolumeDownRounded className={cls.Volume}/> : <VolumeUpRounded className={cls.Volume}/>}
                </button>
            </Tooltip>
            <div className={cls.Detail}>
                <div>{detailsSelect.image && <img className={cls.Image} src={detailsSelect.image} alt="image"/>}</div>
                <div className={cls.TitleContainer}>
                    <div className={cls.Name}>{detailsSelect?.name ?? ''}</div>
                    <div className={cls.Author}>{detailsSelect?.author ?? ''}</div>
                </div>
            </div>
        </div>
    );
}