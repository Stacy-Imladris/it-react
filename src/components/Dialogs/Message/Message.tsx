import React from 'react';
import s from './../Dialogs.module.css';

export type MessagePropsType = {
    message: string
    id: number
}

const Message = (props: MessagePropsType) => {
    return (
        <div className={s.message}>
            {props.message}
        </div>
    )
}

export default Message;