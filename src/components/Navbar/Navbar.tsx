import React from "react";
import { NavLink } from "react-router-dom";
import s from './Navbar.module.css';
import {Sidebar} from "./Sidebar";
import {SidebarType} from "../../redux/state";

type NavbarPropsType = {
    state: SidebarType
}

const Navbar = (props: NavbarPropsType) => {
    return (
        <nav className={s.nav}>
            <div className={`${s.item} ${s.active}`}>
                <NavLink to="/profile" className={({isActive}) => isActive ? s.active : s.item}>Profile</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/dialogs" className={({isActive}) => isActive ? s.active : s.item}>Messages</NavLink>
            </div>
            <div className={s.item}>
                <a>News</a>
            </div>
            <div className={s.item}>
                <a>Music</a>
            </div>
            <div className={s.item}>
                <a>Settings</a>
            </div>
            <div>
                <Sidebar state={props.state}/>
            </div>
        </nav>
    )
}

export default Navbar;