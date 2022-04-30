import s from './Message.module.scss';

export type MessagePropsType = {
    message: string
    id: number
}

export const Message = ({message, id}: MessagePropsType) => <div className={s.message}>
    {message}
</div>