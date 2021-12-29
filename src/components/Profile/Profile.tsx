import React from "react";
import MyPosts, {MyPostsPropsType} from "./MyPosts/MyPosts";
import s from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {changeNewText, ProfilePageType} from "../../redux/state";

type ProfilePropsType = {
    profilePage: ProfilePageType
    addPost: (postText: string) => void
    changeNewText: (newText: string) => void
}

const Profile = (props: ProfilePropsType) => {

    return (
        <div>
            <ProfileInfo/>
            <MyPosts posts={props.profilePage.posts}
                     addPostCallback={props.addPost}
                     messageForNewPost={props.profilePage.messageForNewPost}
                     changeNewPostText={props.changeNewText}
            />
        </div>
    )
}
export default Profile;