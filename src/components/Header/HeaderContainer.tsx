import React from "react";
import {Header} from "./Header";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getAuthUserData} from "../../redux/auth-reducer";

class HeaderContainer extends React.Component<HeaderPropsType> {
    componentDidMount() {
        this.props.getAuthUserData()
    }

    render() {
        return <>
            <Header {...this.props}/>
        </>
    }
}

type MapStatePropsType = {
    login: null | string
    isAuth: boolean
}
type MapDispatchPropsType = {
    getAuthUserData: () => void
}
export type HeaderPropsType = MapStatePropsType & MapDispatchPropsType

const MapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        login: state.auth.login,
        isAuth: state.auth.isAuth,
    }
}

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(MapStateToProps, {getAuthUserData})(HeaderContainer)