import React from "react";
import {Header} from "./Header";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {actions} from "../../redux/auth-reducer";
import {authAPI} from "../../api/api";

class HeaderContainer extends React.Component<HeaderPropsType> {
    componentDidMount() {
        authAPI.isUserAuthorized().then(data => {
            if (data.resultCode === 0) {
                const {id, email, login} = data.data
                this.props.setAuthUserData(id, email, login)
            }
        })
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
    setAuthUserData: (userId: number, email: string, login: string) => void
}
export type HeaderPropsType = MapStatePropsType & MapDispatchPropsType

const MapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        login: state.auth.login,
        isAuth: state.auth.isAuth,
    }
}

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(MapStateToProps, {
    setAuthUserData: actions.setAuthUserData})(HeaderContainer)