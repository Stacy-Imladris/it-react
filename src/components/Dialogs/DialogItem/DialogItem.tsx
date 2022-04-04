import React from 'react';
import s from './../Dialogs.module.css';
import {NavLink} from "react-router-dom";

export type DialogItemPropsType = {
    name: string
    id: number
    img: string
}

export const DialogItem = ({name, id, img}: DialogItemPropsType) => {
    return (
        <div className={s.dialog + ' ' + s.active}>
            <div>
                <img src={img}/>
            </div>
            <div>
                <NavLink to={'/dialogs/' + id}>{name}</NavLink>
            </div>
        </div>
    )
}