import React from "react";
import s from "./ProfileInfo.module.css";
import {ProfileType} from "../../../redux/profile-reducer";
import {Preloader} from "../../common/Preloader/Preloader";

type ProfileInfoPropsType = {
    profile: null | ProfileType
}

const ProfileInfo = (props: ProfileInfoPropsType) => {

    if (!props.profile) {
        return <Preloader/>
    }
    const contactsValues = Object.values(props.profile.contacts)

    return (
        <div>
            <div className={s.banner}>
                <img src='https://artline.ua/storage/images/news/120/ru/news_1600262974910581_0.jpg'/>
            </div>
            <div className={s.avatar}>
                <img src={props.profile?.photos.large ? props.profile?.photos.large : ''}/>
            </div>
            <div className={s.descriptionBlock}>
                <div>{props.profile.fullName}</div>
                <div>{props.profile.aboutMe}</div>
                <div>{props.profile.lookingForAJob ? 'I\'m looking for a job right now' : 'I don\'t need a job'}</div>
                <div>{props.profile.lookingForAJobDescription}</div>
                <span>Where you can find me: </span>
                {contactsValues.map((m, i) => m && <div key={m + i}>{m}</div>)}
            </div>
        </div>
    )
}
export default ProfileInfo;