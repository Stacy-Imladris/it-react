import {Header} from './Header';
import {connect} from 'react-redux';
import {AppStateType, AppThunk} from '../../redux/redux-store';
import {logout} from '../../redux/auth-reducer';
import {compose} from 'redux';
import {Component, ComponentType} from 'react';

class HeaderContainer extends Component<HeaderPropsType> {
    render() {
        return <Header {...this.props}/>
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

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    login: state.auth.login,
    isAuth: state.auth.isAuth,
})

export default compose<ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {logout}),
)(HeaderContainer)
