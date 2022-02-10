import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DialogType, MessageType} from "../../redux/dialogs-reducer";
import {DialogsPropsType} from "./DialogsContainer";

const Dialogs = (props: DialogsPropsType) => {
    const dialogsElements = props.dialogsPage.dialogs.map((d: DialogType) => <DialogItem key={d.id} name={d.name} id={d.id} img={d.img}/>);
    const messagesElements = props.dialogsPage.messages.map((m: MessageType) => <Message key={m.id} message={m.message} id={m.id}/>);
    const addMessage = () => {
        props.sendMessage(props.dialogsPage.messageForNewMessage)
    }
    const onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewMessageBody(e.currentTarget.value)
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
                <div>
                    <textarea onChange={onNewMessageChange}
                              value={props.dialogsPage.messageForNewMessage}
                              placeholder={'Enter your message'}/>
                </div>
                <div>
                    <button onClick={addMessage}>Send message</button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;