import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {MyPostsContainer} from './MyPosts/MyPostsContainer';
import {AppThunk} from 'redux/redux-store';
import {ProfileDataFormPropsType} from './ProfileInfo/ProfileDataForm/ProfileDataForm';
import {ProfileType} from 'api/profile-api';

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

export const Profile = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile,
                            isEditMode, setEditMode}: ProfilePropsType) => (
    <div>
        <ProfileInfo profile={profile} status={status} updateStatus={updateStatus}
                     isOwner={isOwner} savePhoto={savePhoto} saveProfile={saveProfile}
                     isEditMode={isEditMode} setEditMode={setEditMode}/>
        <MyPostsContainer/>
    </div>
)