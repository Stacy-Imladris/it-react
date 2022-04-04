import React from "react";
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import {HeaderPropsType} from "./HeaderContainer";

export const Header = ({login, isAuth, logout}: HeaderPropsType) => {
    return <header className={s.header}>
        <div className={s.container}>
            <img src='https://www.freeiconspng.com/uploads/tesv-skyrim-icon-png-28.png'/>
            <div className={s.loginBlock}>
                {isAuth
                    ? <div>{login} - <button onClick={logout}>Log out</button></div>
                    : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </div>
    </header>
}