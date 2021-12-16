import React from 'react';
import s from './Dialogs.module.css';
import {NavLink} from "react-router-dom";

export type DialogItemPropsType = {
    name: string
    id: number
}
export type MessagePropsType = {
    message: string
}

const DialogItem = (props: DialogItemPropsType) => {
    return (
        <div className={s.dialog + ' ' + s.active}>
            <NavLink to={'/dialogs/' + props.id}>{props.name}</NavLink>
        </div>
    )
}
const Message = (props: MessagePropsType) => {
    return (
        <div className={s.message}>
            {props.message}
        </div>
    )
}

const Dialogs = (props: any) => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <DialogItem name = 'Alex' id = {1}/>
                <DialogItem name = 'Alice' id = {2}/>
                <DialogItem name = 'Tanya' id = {3}/>
                <DialogItem name = 'Stacy' id = {4}/>
            </div>
            <div className={s.messages}>
                <Message message="Hello"/>
                <Message message="How are you?"/>
                <Message message="Ooops"/>
            </div>
        </div>
    )
}
export default Dialogs;