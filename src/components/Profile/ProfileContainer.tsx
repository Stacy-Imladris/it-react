import {Profile} from './Profile';
import {AppStateType, AppThunk} from '../../redux/redux-store';
import {connect} from 'react-redux';
import {
    getStatus, getUserProfile, profileActions, savePhoto, saveProfile, updateStatus
} from '../../redux/profile-reducer';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {ProfileDataFormPropsType} from './ProfileInfo/ProfileDataForm/ProfileDataForm';
import {Component, ComponentType} from 'react';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {ProfileType} from '../../api/profile-api';

export type PathParamsType = {
    userId: string
}
export type ProfilePropsType = MapStatePropsType & MapDispatchPropsType
type CommonPropsType = RouteComponentProps<PathParamsType> & ProfilePropsType

class ProfileContainer extends Component<CommonPropsType> {
    refreshProfile() {
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

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<CommonPropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return <Profile profile={this.props.profile} status={this.props.status}
                        updateStatus={this.props.updateStatus}
                        isOwner={+this.props.match.params.userId === this.props.authorizedUserId
                        || !this.props.match.params.userId}
                        savePhoto={this.props.savePhoto}
                        saveProfile={this.props.saveProfile}
                        isEditMode={this.props.isEditMode}
                        setEditMode={this.props.setEditMode}/>
    }
}

export type MapStatePropsType = {
    profile: null | ProfileType
    status: string
    authorizedUserId: number
    isAuth: boolean
    isEditMode: boolean
}
export type MapDispatchPropsType = {
    getUserProfile: (userId: number) => AppThunk
    getStatus: (userId: number) => AppThunk
    updateStatus: (status: string) => AppThunk
    savePhoto: (file: string | Blob) => AppThunk
    saveProfile: (profile: ProfileDataFormPropsType) => AppThunk
    setEditMode: (isEditMode: boolean) => void
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    isEditMode: state.profilePage.isEditMode,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth,
})

export default compose<ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
        getUserProfile, getStatus, updateStatus, savePhoto, saveProfile,
        setEditMode: profileActions.setEditMode
    }),
    withRouter,
    withAuthRedirect
)(ProfileContainer)