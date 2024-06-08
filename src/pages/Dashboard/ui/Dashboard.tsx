import {Navbar} from "widgets/Navbar";
import {Table} from 'widgets/Table'
import Paranoid from "shared/assets/music/Black_Sabbath_-_Paranoid.mp3"
import ShurtYourMouth from "shared/assets/music/Pain_-_ShurtYourMouth.mp3"
import Rollin from "shared/assets/music/Limp_Bizkit_-_Rollin.mp3"
import {useState} from "react";
import {PlayerControls} from "widgets/PlayerControls";
import cls from './Dashboard.module.scss'
import {useRef,useEffect} from "react";

const readableDuration = (seconds) => {
    let sec:number | string = Math.floor( seconds );
    let min:number | string = Math.floor( sec / 60 );
    min = min >= 10 ? min : '' + min;
    sec = Math.floor( sec % 60 );
    sec = sec >= 10 ? sec : '0' + sec;
    return min + ':' + sec;
}

export const Dashboard = () => {
    const columns = [
        {name:"id",label:'id'},
        {name:"author"},
        {name:"title"},
        {name:"album"},
        {name:"duration"},
    ]
    const rows = [
        {id:1,author:'Black_Sabbath',name:"Paranoid",album:'unknown',duration:30000,file:new Audio(Paranoid)},
        {id:2,author:'Pain',name:"_ShurtYourMouth",album:'unknown',duration:30000,file:new Audio(ShurtYourMouth)},
        {id:3,author:'Limp_Bizkit',name:"_Rollin",album:'unknown',duration:30000,file:new Audio(Rollin)},
    ]
    const [selection,setSelection] = useState<(number[])>([])
    const [active,setActive] = useState<null |  HTMLAudioElement>(null)
    const audioElement = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration,setDuration] = useState("0:00")
    const [durationMax,setDurationMax] = useState(100)
    const [currTime, setCurrTime] = useState({
        min: "0",
        sec: "0",
    }); // текущее положение звука в минутах и секундах
    const [seconds, setSeconds] = useState(0); // текущая позиция звука в секундах
    useEffect(() => {
        if(active) {
            if (isPlaying) {
                active?.play()
            } else {
                active?.pause()
            }
        }
    });
    useEffect(() => {
        const interval = setInterval(() => {
            if (active) {
                setSeconds(active?.currentTime); // устанавливаем состояние с текущим значением в секундах
                const min = Math.floor(active?.currentTime / 60);
                const sec = Math.floor(active?.currentTime % 60);
                setCurrTime({
                    min,
                    sec,
                });
            }
        }, 500);
        return () => clearInterval(interval);
    }, [active]);

    return (
        <div className={cls.Container}>
            <Navbar />
            <div className={cls.Playlist}>
                <Table columns={columns} rows={rows} height={500} selection={selection} setSelection={(e)=>{
                    setIsPlaying(false)
                    if(e.length > 0){
                        const indexE = e.length - 1
                        const index = e[indexE]
                        const find = rows[index]
                        if(find){
                            setDurationMax(find.file.duration)
                            setDuration(readableDuration(find.file.duration))
                            setActive((prev) => {
                                prev?.pause()
                                return find.file
                            })
                            setSelection([index])
                            setIsPlaying(true)
                        }
                    }else{
                        setActive((prev) => {
                            prev?.pause()
                            return null
                        })
                        setSelection([])
                    }
                }} />
            </div>
            <div className={cls.PlaylistContainer}>
                {active && <audio
                    src={active as unknown as string}
                    ref={audioElement}
                />}
                <PlayerControls
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    SkipSong={() => {}}
                    duration={duration}
                    durationMax={durationMax}
                    currTime={currTime}
                    seconds={seconds}
                    active={active}
                    initActive={() => {
                        if(rows.length > 0){
                        const find = rows[0]
                        setDuration(readableDuration(find.file.duration))
                        setActive((prev) => {
                            prev?.pause()
                            return find.file
                        })
                        setSelection([0])
                            return true
                        }else{
                            return false
                        }
                    }}
                />
            </div>
        </div>
    );
};