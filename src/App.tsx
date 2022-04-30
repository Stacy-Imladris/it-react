import React from 'react';
import './App.css';
import {Navbar} from './components/Navbar/Navbar';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import {connect} from 'react-redux';
import {AppStateType, AppThunk} from './redux/redux-store';
import {compose} from 'redux';
import {appActions, initializeApp} from './redux/app-reducer';
import {Preloader} from './components/common/Preloader/Preloader';
import {withSuspense} from './hoc/withSuspense';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));



class App extends React.Component<AppPropsType> {
    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        this.props.setGlobalError(e.reason.message)
    }

    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    render() {
        if (!this.props.initialized) return <Preloader/>
        let str = `/profile/${this.props.userId ? ':userId?' : ''}`

        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Switch>
                        <Route exact path="/" render={() => <Redirect to={'/profile'}/>}/>
                        <Route path={str} render={withSuspense(ProfileContainer)}/>
                        <Route path="/dialogs" render={withSuspense(DialogsContainer)}/>
                        <Route path="/users" render={() => <UsersContainer/>}/>
                        <Route path="/login" render={() => <Login/>}/>
                        <Route path="*" render={() => <div>404 NOT FOUND</div>}/>
                    </Switch>
                </div>
            </div>
        )
    }
}

type MapStatePropsType = {
    initialized: boolean
    userId: number
}
type MapDispatchPropsType = {
    initializeApp: () => AppThunk
    setGlobalError: (error: null | string) => void
}
type AppPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        initialized: state.app.initialized,
        userId: state.auth.id,
    }
}

export default compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
        initializeApp, setGlobalError: appActions.setGlobalError
    }),
    withRouter)(App)