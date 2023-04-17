import s from './ProfileData.module.scss';
import {ProfileType} from 'api/profile-api';

type ProfileDataPropsType = {
    profile: ProfileType
    setEditMode: (isEditMode: boolean) => void
}

export const ProfileData = ({profile, setEditMode}: ProfileDataPropsType) => {
    const {contacts, fullName, aboutMe, lookingForAJob, lookingForAJobDescription} = profile
    const contactsValues = Object.values(contacts || {})

    const showEditProfileForm = () => setEditMode(true)

    return (
        <div className={s.descriptionBlock}>
            <button onClick={showEditProfileForm}>Edit profile</button>
            <div>{fullName}</div>
            <div>{aboutMe}</div>
            <div>{lookingForAJob ? 'I\'m looking for a job right now' : 'I don\'t need a job'}</div>
            <div>{lookingForAJobDescription}</div>
            <span>Where you can find me: </span>
            {contactsValues.map(m => m && <div key={m}>{m}</div>)}
        </div>
    )
}