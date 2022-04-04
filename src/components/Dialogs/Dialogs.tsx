import React from 'react';
import s from './Dialogs.module.css';
import {DialogItem} from './DialogItem/DialogItem';
import {Message} from './Message/Message';
import {DialogType, MessageType} from '../../redux/dialogs-reducer';
import {DialogsPropsType} from './DialogsContainer';
import {AddMessageFormDataType, AddMessageFormRedux} from './AddMessageForm/AddMessageForm';

export const Dialogs = ({dialogsPage, addMessage}: DialogsPropsType) => {
    const dialogsElements = dialogsPage.dialogs.map((d: DialogType) => <DialogItem key={d.id} name={d.name}
                                                                                         id={d.id} img={d.img}/>);
    const messagesElements = dialogsPage.messages.map((m: MessageType) => <Message key={m.id} message={m.message}
                                                                                         id={m.id}/>);

    const addNewMessage = (formData: AddMessageFormDataType) => {
        addMessage(formData.newMessageBody)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
            <AddMessageFormRedux onSubmit={addNewMessage}/>
        </div>
    )
}