import React from "react";
import s from './Post.module.css';

type PostPropsType = {
    message: string
    likeCount: number
}

const Post = (props: PostPropsType) => {
    return <div className={s.item}>
        <img src='https://99px.ru/sstorage/1/2012/06/image_10406120020582211120.gif'/>
        {props.message}
        <div>
            <span>likes</span> {props.likeCount}
        </div>
    </div>
}

export default Post;