import React from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {AppThunk} from '../../redux/redux-store';
import {ProfileType} from '../../api/api';

type ProfilePropsType = {
    profile: null | ProfileType
    status: string
    updateStatus: (status: string) => AppThunk
}

const Profile = ({profile, status, updateStatus}: ProfilePropsType) => {

    return (
        <div>
            <ProfileInfo profile={profile} status={status} updateStatus={updateStatus}/>
            <MyPostsContainer/>
        </div>
    )
}
export default Profile;