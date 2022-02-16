import React from "react";
import Profile from "./Profile";
import axios from "axios";
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {actions, ProfileType} from "../../redux/profile-reducer";
import {Params} from "react-router-dom";

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
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId).then(response => {
            this.props.setUserProfile(response.data)
        })
    }

    render() {
        return (
            <Profile profile={this.props.profile} />
        )
    }
}

export type MapStatePropsType = {
    profile: null | ProfileType
}
export type MapDispatchPropsType = {
    setUserProfile: (profile: null | ProfileType) => void
}
export type ProfilePropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        profile: state.profilePage.profile
    }
}

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
    setUserProfile: actions.setUserProfile})(ProfileContainer);