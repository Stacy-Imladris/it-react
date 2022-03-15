import React from "react";
import {Header} from "./Header";
import {connect} from "react-redux";
import {AppStateType, AppThunk} from '../../redux/redux-store';
import {logout} from '../../redux/auth-reducer';
import {compose} from 'redux';

class HeaderContainer extends React.Component<HeaderPropsType> {
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
    logout: () => AppThunk
}
export type HeaderPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        login: state.auth.login,
        isAuth: state.auth.isAuth,
    }
}

/*export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {getAuthUserData})(HeaderContainer)*/
export default compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {logout}),
)(HeaderContainer)
