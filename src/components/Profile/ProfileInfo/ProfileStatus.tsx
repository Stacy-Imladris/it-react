import React, {ChangeEvent} from 'react';
import s from './ProfileInfo.module.css';
import {AppThunk} from '../../../redux/redux-store';

type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string) => AppThunk
}

export class ProfileStatus extends React.PureComponent<ProfileStatusPropsType> {
    state = {
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
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                <div><span onDoubleClick={this.activateEditMode}>{this.props.status || '-------'}</span></div>}
                {this.state.editMode &&
                <div><input onChange={this.onStatusChange} value={this.state.status} onBlur={this.deactivateEditMode} autoFocus/></div>}
            </div>
        )
    }
}