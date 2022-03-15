import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {MyPostsPropsType} from './MyPostsContainer';
import {AddPostFormDataType, AddPostFormRedux} from './AddPostForm/AddPostForm';

export const MyPosts = (props: MyPostsPropsType) => {
    const postsElements = props.posts.map(p => <Post key={p.id} message={p.message} likeCount={p.likesCount}/>);

    const addNewPost = (formData: AddPostFormDataType) => {
        props.addPost(formData.newPostBody)
    }

    return (
        <div className={s.postBlock}>
            <h3>My posts</h3>
            <AddPostFormRedux onSubmit={addNewPost}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}