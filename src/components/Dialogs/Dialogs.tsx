import s from './Dialogs.module.scss';
import {DialogItem} from './DialogItem/DialogItem';
import {Message} from './Message/Message';
import {DialogType, MessageType} from 'redux/dialogs-reducer';
import {DialogsPropsType} from './DialogsContainer';
import {AddMessageFormDataType, AddMessageFormRedux} from './AddMessageForm/AddMessageForm';

export const Dialogs = ({dialogsPage, addMessage}: DialogsPropsType) => {
    const dialogsElements = dialogsPage.dialogs
        .map(({id, name, img}: DialogType) => <DialogItem key={id} id={id} name={name}
                                                          img={img}/>)

    const messagesElements = dialogsPage.messages
        .map(({id, message}: MessageType) => <Message key={id} id={id} message={message}/>)

    const addNewMessage = (formData: AddMessageFormDataType) => {
        addMessage(formData.newMessageBody)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>{dialogsElements}</div>
            <div className={s.messages}>{messagesElements}</div>
            <AddMessageFormRedux onSubmit={addNewMessage}/>
        </div>
    )
}