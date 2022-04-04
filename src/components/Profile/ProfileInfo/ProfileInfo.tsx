import React from "react";
import s from "./ProfileInfo.module.css";
import {Preloader} from "../../common/Preloader/Preloader";
import {AppThunk} from '../../../redux/redux-store';
import {ProfileStatusWithHooks} from './ProfileStatusWithHooks';
import {ProfileType} from '../../../api/api';

type ProfileInfoPropsType = {
    profile: null | ProfileType
    status: string
    updateStatus: (status: string) => AppThunk
}

export const ProfileInfo = ({profile, status, updateStatus}: ProfileInfoPropsType) => {
    if (!profile) {
        return <Preloader/>
    }
    const contactsValues = Object.values(profile.contacts)

    return (
        <div>
            {/*<div className={s.banner}>
                <img src='https://artline.ua/storage/images/news/120/ru/news_1600262974910581_0.jpg'/>
            </div>*/}
            <div className={s.avatar}>
                <img src={profile?.photos.large ? profile?.photos.large : ''}/>
            </div>
            <div className={s.descriptionBlock}>
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                <div>{profile.fullName}</div>
                <div>{profile.aboutMe}</div>
                <div>{profile.lookingForAJob ? 'I\'m looking for a job right now' : 'I don\'t need a job'}</div>
                <div>{profile.lookingForAJobDescription}</div>
                <span>Where you can find me: </span>
                {contactsValues.map((m, i) => m && <div key={m + i}>{m}</div>)}
            </div>
        </div>
    )
}