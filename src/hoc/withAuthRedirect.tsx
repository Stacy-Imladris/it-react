import {Redirect} from 'react-router-dom';
import {ComponentType} from 'react';
import {connect} from 'react-redux';
import {AppStateType} from '../redux/redux-store';
import {PATH} from '../enums/paths';

type MapStatePropsType = {
    isAuth: boolean
}
const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth
})

export function withAuthRedirect<T>(Component: ComponentType<T>) {
    const RedirectComponent = (props: MapStatePropsType) => {
        let {isAuth, ...restProps} = props
        if (!isAuth) return <Redirect to={PATH.LOGIN}/>
        return <Component {...restProps as T}/>
    }
    return connect(mapStateToProps)(RedirectComponent)
}