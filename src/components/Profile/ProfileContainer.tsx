import React, {ComponentType} from "react";
import Profile from "./Profile";
import axios from "axios";
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {ProfileType, setUserProfile} from "../../redux/profile-reducer";
import {NavigateFunction, Params, useLocation, useNavigate, useParams} from "react-router-dom";

type PathParamsType = {
    userId: number
}
// export type CommonPropsType = RouteComponentProps<PathParamsType> & ProfilePropsType

function withRouter<T>(Component: ComponentType<T>) {
    function ComponentWithRouterProp(props: T & WithRouterType) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return(
            <Component
                {...props}
            router={{location, navigate, params}}/>
        )
    }
    return ComponentWithRouterProp
}

type WithRouterType = Location & NavigateFunction & Readonly<Params<string>>;
class ProfileContainer extends React.Component<any> {

    componentDidMount() {
        let userId = this.props.params.userId
        if (!userId) {
            userId = 2
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId).then(response => {
            this.props.setUserProfile(response.data)
        })
    }

    render() {
        return (
            <Profile {...this.props}/>
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

const withUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {setUserProfile})(withUrlDataContainerComponent);