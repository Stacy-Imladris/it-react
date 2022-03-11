import React from "react";
import Profile from "./Profile";
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {getUserProfile, ProfileType} from "../../redux/profile-reducer";
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';
import {RouterType, withRouter} from './ProfileWithParam';

// export type MatchPropsType = {
//     router: {params: { userId: string } }
// }
// type ProfileContainerPropsType = ProfilePropsType & MatchPropsType
type ProfileContainerPropsType = ProfilePropsType & RouterType

export type ProfilePropsType = MapStatePropsType & MapDispatchPropsType

class ProfileContainer extends React.Component<ProfileContainerPropsType> {

    componentDidMount() {
        let userId = Number(this.props.router.params.userId)
        if (!userId) {
            userId = 2
        }
        this.props.getUserProfile(userId)
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
    getUserProfile: (userId: number) => void
}


const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        profile: state.profilePage.profile,
    }
}

export default withRouter<ProfileContainerPropsType>(compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {getUserProfile}),
    withAuthRedirect)(ProfileContainer))

/*
export default withAuthRedirect(connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {getUserProfile})(ProfileContainer))*/
