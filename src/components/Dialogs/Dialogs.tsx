import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DialogsPageType, DialogType, MessageType} from "../../redux/state";

type DialogsPropsType = {
    state: DialogsPageType
}

const Dialogs = (props: DialogsPropsType) => {

    let dialogsElements = props.state.dialogs.map((d: DialogType) => <DialogItem name={d.name} id={d.id} />);
    let messagesElements = props.state.messages.map((m: MessageType) => <Message message={m.message} id={m.id}/>);

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
        </div>

    )
}

export default Dialogs;