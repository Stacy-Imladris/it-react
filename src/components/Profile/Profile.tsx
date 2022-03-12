import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../redux/profile-reducer";
import {AppThunk} from '../../redux/redux-store';

type ProfilePropsType = {
    profile: null | ProfileType
    status: string
    updateStatus: (status: string) => AppThunk
}

const Profile = (props: ProfilePropsType) => {

    return (
        <div>
            <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
            <MyPostsContainer/>
        </div>
    )
}
export default Profile;