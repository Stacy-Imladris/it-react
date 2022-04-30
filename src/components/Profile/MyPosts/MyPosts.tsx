import s from './MyPosts.module.scss';
import {Post} from './Post/Post';
import {MyPostsPropsType} from './MyPostsContainer';
import {AddPostFormDataType, AddPostFormRedux} from './AddPostForm/AddPostForm';
import {memo} from 'react';

export const MyPosts = memo(({posts, addPost}: MyPostsPropsType) => {
    const postsElements = [...posts].reverse().map(({id, message, likesCount}) => (
        <Post key={id} message={message} likeCount={likesCount}/>
    ))

    const addNewPost = (formData: AddPostFormDataType) => addPost(formData.newPostBody)

    return (
        <div className={s.postBlock}>
            <h3>My posts</h3>
            <AddPostFormRedux onSubmit={addNewPost}/>
            <div className={s.posts}>{postsElements}</div>
        </div>
    )
})