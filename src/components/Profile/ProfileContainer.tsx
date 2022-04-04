import React from 'react';
import Profile from './Profile';
import {AppStateType, AppThunk} from '../../redux/redux-store';
import {connect} from 'react-redux';
import {getStatus, getUserProfile, updateStatus} from '../../redux/profile-reducer';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {ProfileType} from '../../api/api';

export type PathParamsType = {
    userId: string
}
export type ProfilePropsType = MapStatePropsType & MapDispatchPropsType
type CommonPropsType = RouteComponentProps<PathParamsType> & ProfilePropsType

class ProfileContainer extends React.Component<CommonPropsType> {

    componentDidMount() {
        const {match, authorizedUserId, history, getUserProfile, getStatus} = this.props
        let userId = +match.params.userId
        if (!userId) {
            userId = authorizedUserId
            if (!userId) {
                history.push('/login')
            }
        }
        getUserProfile(userId)
        getStatus(userId)
    }

    render() {
        return (
            <Profile profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus}/>
        )
    }
}

export type MapStatePropsType = {
    profile: null | ProfileType
    status: string
    authorizedUserId: number
    isAuth: boolean
}
export type MapDispatchPropsType = {
    getUserProfile: (userId: number) => AppThunk
    getStatus: (userId: number) => AppThunk
    updateStatus: (status: string) => AppThunk
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.id,
        isAuth: state.auth.isAuth,
    }
}

export default compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
        getUserProfile, getStatus, updateStatus}),
    withRouter,
    //withAuthRedirect
)(ProfileContainer)