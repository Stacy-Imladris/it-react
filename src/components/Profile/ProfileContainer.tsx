import React from "react";
import Profile from "./Profile";
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {getUserProfile, ProfileType} from "../../redux/profile-reducer";
import {Navigate, Params} from "react-router-dom";

type PropsType = {
    match?: { userId: string } | Params<string>
}

type ProfileContainerPropsType = ProfilePropsType & PropsType

class ProfileContainer extends React.Component<ProfileContainerPropsType> {

    componentDidMount() {
        let userId = Number(this.props.match?.userId)
        if (!userId) {
            userId = 2
        }
        this.props.getUserProfile(userId)
    }

    render() {
        if (!this.props.isAuth) return <Navigate to={'/login'}/>
        return (
            <Profile profile={this.props.profile}/>
        )
    }
}

export type MapStatePropsType = {
    profile: null | ProfileType
    isAuth: boolean
}
export type MapDispatchPropsType = {
    getUserProfile: (userId: number) => void
}
export type ProfilePropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        profile: state.profilePage.profile,
        isAuth: state.auth.isAuth
    }
}

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {getUserProfile})(ProfileContainer);