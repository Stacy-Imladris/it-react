import React from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {AppThunk} from '../../redux/redux-store';
import {ProfileType} from '../../api/api';
import {ProfileDataFormPropsType} from './ProfileInfo/ProfileDataForm/ProfileDataForm';

type ProfilePropsType = {
    profile: null | ProfileType
    status: string
    updateStatus: (status: string) => AppThunk
    isOwner: boolean
    savePhoto: (file: string | Blob) => AppThunk
    saveProfile: (profile: ProfileDataFormPropsType) => AppThunk
    isEditMode: boolean
    setEditMode: (isEditMode: boolean) => void
}

const Profile = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile, isEditMode, setEditMode}: ProfilePropsType) => {

    return (
        <div>
            <ProfileInfo profile={profile} status={status} updateStatus={updateStatus}
                         isOwner={isOwner} savePhoto={savePhoto} saveProfile={saveProfile}
                         isEditMode={isEditMode} setEditMode={setEditMode}/>
            <MyPostsContainer/>
        </div>
    )
}
export default Profile;