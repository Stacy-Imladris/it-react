import React, {ChangeEvent, useEffect, useState} from 'react';
import {AppThunk} from '../../../redux/redux-store';

type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string) => AppThunk
}

export const ProfileStatusWithHooks: React.FC<ProfileStatusPropsType> = ({status, updateStatus}) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [profileStatus, setProfileStatus] = useState<string>(status)

    useEffect(() => {
        setProfileStatus(status)
    }, [status])

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        updateStatus(profileStatus)
        setEditMode(false)
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setProfileStatus(e.currentTarget.value)
    }
    /*state = {
        editMode: false,
        status: this.props.status
    }
    activateEditMode = () => {
        this.setState({editMode: true})
    }
    deactivateEditMode = () => {
        this.setState({editMode: false})
        this.props.updateStatus(this.state.status)
    }
    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({status: e.currentTarget.value})
    }
    componentDidUpdate(prevProps: Readonly<ProfileStatusPropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if (prevProps.status !== this.props.status) {
            this.setState({status: this.props.status})
        }
    }*/

    return (
        <div>
            {!editMode &&
            <div><span onDoubleClick={activateEditMode}>{status || 'no status'}</span></div>}
            {editMode &&
            <div><input onChange={onStatusChange} value={profileStatus} onBlur={deactivateEditMode} autoFocus/></div>}
        </div>
    )
}