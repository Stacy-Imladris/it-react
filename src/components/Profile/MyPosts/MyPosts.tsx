import React, {ChangeEvent} from "react";
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {PostType} from "../../../redux/state";

export type MyPostsPropsType = {
    posts: Array<PostType>
    addPostCallback: (postText: string) => void
    messageForNewPost: string
    changeNewPostText: (newText: string) => void
}

const MyPosts = (props: MyPostsPropsType) => {
    const postsElements = props.posts.map(p => <Post message={p.message} likeCount={p.likesCount}/>);

    const addPost = () => {
        props.addPostCallback(props.messageForNewPost)
    }

    const newTextChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.changeNewPostText(e.currentTarget.value)
    }

    return (
        <div className={s.postBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea onChange={newTextChangeHandler} value={props.messageForNewPost} />
                </div>
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}
export default MyPosts;