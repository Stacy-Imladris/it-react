import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DialogsPageType, DialogType, MessageType} from "../../redux/state";

type DialogsPropsType = {
    dialogsPage: DialogsPageType
    addMessageCallback: (messageForNewMessage: string) => void
    changeNewMessageText: (newTextMessage: string) => void
}

const Dialogs = (props: DialogsPropsType) => {

    const dialogsElements = props.dialogsPage.dialogs.map((d: DialogType) => <DialogItem name={d.name} id={d.id} img={d.img}/>);
    const messagesElements = props.dialogsPage.messages.map((m: MessageType) => <Message message={m.message} id={m.id}/>);

    const addMessage = () => {
        props.addMessageCallback(props.dialogsPage.messageForNewMessage)
    }

    const newMessageChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.changeNewMessageText(e.currentTarget.value)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
            <div>
                <textarea onChange={newMessageChangeHandler} value={props.dialogsPage.messageForNewMessage}/>
            </div>
            <div>
                <button onClick={addMessage}>Add post</button>
            </div>
        </div>

    )
}

export default Dialogs;