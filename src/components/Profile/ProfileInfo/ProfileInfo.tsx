import {ChangeEvent} from 'react';
import s from './ProfileInfo.module.scss';
import {Preloader} from 'components/common/Preloader/Preloader';
import {AppThunk} from 'redux/redux-store';
import userPhoto from 'assets/images/user.png';
import {ProfileData} from './ProfileData/ProfileData';
import {ProfileDataFormPropsType, ProfileDataReduxForm} from './ProfileDataForm/ProfileDataForm';
import {ProfileStatusWithHooks} from './ProfileData/ProfileStatus/ProfileStatusWithHooks';
import {ProfileType} from 'api/profile-api';

type Props = {
    profile: null | ProfileType
    status: string
    updateStatus: (status: string) => AppThunk
    isOwner: boolean
    savePhoto: (file: string | Blob) => AppThunk
    saveProfile: (profile: ProfileDataFormPropsType) => AppThunk
    isEditMode: boolean
    setEditMode: (isEditMode: boolean) => void
}

export const ProfileInfo = (
    {profile, status, updateStatus, savePhoto, saveProfile, isOwner, isEditMode, setEditMode}: Props
) => {
    if (!profile) return <Preloader/>

    const mainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: ProfileDataFormPropsType) => {
        saveProfile(formData)
    }

    return (
        <div>
            <div className={s.avatar}>
                <img src={profile.photos.large || userPhoto} alt={'user avatar'}/>
                {isOwner && <input type={'file'} onChange={mainPhotoSelected}/>}
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            </div>
            {
                isEditMode
                    ? <ProfileDataReduxForm initialValues={profile} onSubmit={onSubmit}/>
                    : <ProfileData profile={profile} setEditMode={setEditMode}/>
            }
        </div>
    )
}