import cls from "./Navbar.module.scss"
import {useState} from "react";
import {classNames} from "shared/lib/classNames";
import {TextField} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import DashboardIcon from '@mui/icons-material/Dashboard';

const items = [
    {id:'library',name:'my Library',icon:<LibraryBooksIcon />},
    {id:'home',name:'Home',icon:<HomeIcon/>},
    {id:'discover',name:'Discover',icon:<DashboardIcon/>},
    {id:'search',name:'Search'},
]

export const Navbar = () => {
    const [active,setActive] = useState('library')
    return (
        <div className={cls.Navbar}>
            <div className={cls.Links}>
                {items.map((el) => {
                    if(el.id === "search"){
                        return <div key={`link-${el.id}`} className={cls.Link}>
                            <TextField className={cls.Search} placeholder="test" variant="outlined" />
                        </div>
                    }
                    return <div onClick={()=>setActive(el.id)} key={`link-${el.id}`} className={classNames(cls.Link,{[cls.Active]:active === el.id},[])}>
                        <div className={cls.PartLink}>{el.icon}</div>
                        <div className={cls.PartLink}>{el.name}</div>
                    </div>
                })}
            </div>
        </div>
    );
};