import {ChangeEvent, FC, useEffect, useState} from 'react';
import {AppThunk} from 'redux/redux-store';

type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string) => AppThunk
}

export const ProfileStatusWithHooks: FC<ProfileStatusPropsType> = ({
                                                                       status,
                                                                       updateStatus
                                                                   }) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [profileStatus, setProfileStatus] = useState<string>(status)

    useEffect(() => {
        setProfileStatus(status)
    }, [status])

    const activateEditMode = () => setEditMode(true)

    const deactivateEditMode = () => {
        updateStatus(profileStatus)
        setEditMode(false)
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setProfileStatus(e.currentTarget.value)
    }

    return editMode ?
        <div>
            <input onChange={onStatusChange} value={profileStatus} autoFocus
                   onBlur={deactivateEditMode}/>
        </div>
        : <div><span onDoubleClick={activateEditMode}>{status || 'no status'}</span></div>
}