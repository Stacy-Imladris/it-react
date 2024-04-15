import s from './Post.module.scss';

type PostPropsType = {
    message: string
    likeCount: number
}

export const Post = ({message, likeCount}: PostPropsType) => (
    <div className={s.item}>
        <img src="https://99px.ru/sstorage/1/2012/06/image_10406120020582211120.gif"
             alt={'avatar image'}/>
        {message}
        <div><span>like</span> {likeCount}</div>
    </div>
)
