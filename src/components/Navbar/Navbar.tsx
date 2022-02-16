import React from "react";
import { NavLink } from "react-router-dom";
import s from './Navbar.module.css';
import {SidebarContainer} from "./SidebarContainer";

type NavbarPropsType = {}

export const Navbar = (props: NavbarPropsType) => {
    return (
        <nav className={s.nav}>
            <div className={`${s.item} ${s.active}`}>
                <NavLink to="/profile" className={({isActive}) => isActive ? s.active : s.item}>Profile</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/dialogs" className={({isActive}) => isActive ? s.active : s.item}>Messages</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/users" className={({isActive}) => isActive ? s.active : s.item}>Users</NavLink>
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
                <SidebarContainer/>
            </div>
        </nav>
    )
}