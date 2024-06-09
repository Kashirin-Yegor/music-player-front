import {Navbar} from "widgets/Navbar";
import {Table} from 'widgets/Table'
import Paranoid from "shared/assets/music/Black_Sabbath_-_Paranoid.mp3"
import ShurtYourMouth from "shared/assets/music/Pain_-_ShurtYourMouth.mp3"
import Rollin from "shared/assets/music/Limp_Bizkit_-_Rollin.mp3"
import {useState} from "react";
import {PlayerControls} from "widgets/PlayerControls";
import cls from './Dashboard.module.scss'
import {useRef,useEffect} from "react";
import image1 from 'shared/assets/pictures/blackSabbath_Paranoid.jpg'
import image2 from 'shared/assets/pictures/pain_shoutyourmouse.jpg'
import image3 from 'shared/assets/pictures/Limp_Bizkit_-_Rollin.jpeg'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay} from "@fortawesome/free-solid-svg-icons";

export interface IRow{
    image:string
    name:string
    author:string
    id:number
}

const readableDuration = (seconds:number) => {
    let sec:number | string = Math.floor( seconds );
    let min:number | string = Math.floor( sec / 60 );
    min = min >= 10 ? min : '' + min;
    sec = Math.floor( sec % 60 );
    sec = sec >= 10 ? sec : '0' + sec;
    return min + ':' + sec;
}

export const Dashboard = () => {
    const [active,setActive] = useState<null |  HTMLAudioElement>(null)
    const [selection,setSelection] = useState<(number[])>([])
    const rows = [
            {id:1,author:'Black_Sabbath',name:"Paranoid",album:'unknown',duration:0,file:new Audio(Paranoid),image:image1},
            {id:2,author:'Pain',name:"Shurt-Your-Mouth",album:'unknown',duration:0,file:new Audio(ShurtYourMouth),image:image2},
            {id:3,author:'Limp_Bizkit',name:"Rollin",album:'unknown',duration:0,file:new Audio(Rollin),image:image3},
        ]
    const columns = [
        {
            name:"id",
            label:'id',
            width:100,
            render:(value:number)=>{
                const index = selection[0]
                const id = rows[index]?.id ?? null
                if(id === value){
                    return <div className={cls.PlayIcon}><FontAwesomeIcon icon={faPlay}/></div>
                }
                return <>{value}</>
            }},
        {
            name:"title",
            width:600,
            render:(_:unknown,row:IRow) => {
            return <div className={cls.NameContainer}>
                <div><img className={cls.Image} src={row.image} alt={String(row.id)}/></div>
                <div className={cls.Title}>
                    <div>{row.name}</div>
                    <div>{row.author}</div>
                </div>
            </div>
            }},
        {name:"album",width:300,},
        {name:"duration",width:300,render:()=>{
            return <>{`0:00`}</>
            }},
    ]
    const audioElement = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration,setDuration] = useState("")
    const [durationMax,setDurationMax] = useState(100)
    const [currTime, setCurrTime] = useState({
        min: "0",
        sec: "0",
    }); // текущее положение звука в минутах и секундах
    const [seconds, setSeconds] = useState(0); // текущая позиция звука в секундах
    const [detailsSelect,setDetailsSelect] = useState<{image?:string,name?:string,author?:string}>({})
    useEffect(() => {
        if(active) {
            if (isPlaying) {
                setDurationMax(active.duration ? active.duration : 100)
                setDuration(active.duration ? readableDuration(active.duration) : '')
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
                    min:String(min),
                    sec:String(sec),
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
                        const arr = e as number[]
                        const indexE = arr.length - 1
                        const index = arr[indexE] as unknown as number
                        const find = rows[index]
                        if(find){
                            setActive((prev) => {
                                prev?.pause()
                                return find.file
                            })
                            setSelection([index])
                            setIsPlaying(true)
                            setDetailsSelect({
                                image:find.image,
                                name:find.name,
                                author:find.author,
                            })
                        }
                    }else{
                        setActive((prev) => {
                            prev?.pause()
                            return null
                        })
                        setSelection([])
                        setDurationMax(100)
                        setDuration('')
                        setDetailsSelect({})
                    }
                }} />
            </div>
            <div className={cls.PlaylistContainer}>
                {active && <audio
                    src={active as unknown as string}
                    ref={audioElement}
                />}
            </div>
            <PlayerControls
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                SkipSong={(value) => {
                    if(value === 'back'){
                        const index = selection[0] - 1 === -1 ? 0 :  selection[0] - 1
                        const find = rows[index ]
                        setActive((prev) => {
                            prev?.pause()
                            return find.file
                        })
                        setSelection([index])
                        setIsPlaying(true)
                        setDetailsSelect({
                            image:find.image,
                            name:find.name,
                            author:find.author,
                        })
                    }
                    if(value === 'next'){
                        const index = selection[0] + 1 === rows.length  ? rows.length - 1 :  selection[0] + 1
                        const find = rows[index ]
                        setActive((prev) => {
                            prev?.pause()
                            return find.file
                        })
                        setSelection([index])
                        setIsPlaying(true)
                        setDetailsSelect({
                            image:find.image,
                            name:find.name,
                            author:find.author,
                        })
                    }
                }}
                duration={duration}
                durationMax={durationMax}
                currTime={currTime}
                seconds={seconds}
                active={active}
                detailsSelect={detailsSelect}
            />
        </div>
    );
};