import React from "react";
import s from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = () => {
    return <div>
        My posts
        <div>
            <textarea></textarea>
            <button>Add post</button>
        </div>
        <div className={s.posts}>
            <Post message='Hi, how are you?' likeCount={0}/>
            <Post message="It's my first post" likeCount={23}/>
        </div>
    </div>
}
export default MyPosts;