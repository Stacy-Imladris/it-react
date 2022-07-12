import './App.css';
import {Link, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import {LoginPage} from './components/Login/Login';
import {connect} from 'react-redux';
import {AppStateType, AppThunk} from './redux/redux-store';
import {compose} from 'redux';
import {appActions, initializeApp} from './redux/app-reducer';
import {Preloader} from './components/common/Preloader/Preloader';
import {withSuspense} from './hoc/withSuspense';
import {Component, ComponentType, lazy} from 'react';
import {PATH} from './enums/paths';
import {UsersPage} from './components/Users/UsersContainer';
import 'antd/dist/antd.css';
import type {MenuProps} from 'antd';
import {Breadcrumb, Layout, Menu} from 'antd';
import {UserOutlined, TeamOutlined} from '@ant-design/icons';
import {v1} from 'uuid';

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu

const items1: MenuProps['items'] = ['1', '2', '3'].map(key => ({
    key,
    label: `nav ${key}`,
}));

const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = lazy(() => import('./components/Profile/ProfileContainer'));

class App extends Component<AppPropsType> {
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
        let str = `${PATH.PROFILE}/${this.props.userId ? ':userId?' : ''}`

        return (
            // <div className="app-wrapper">
            //     <HeaderContainer/>
            //     <Navbar/>
            //     <div className="app-wrapper-content">
            //         <Switch>
            //             <Route exact path="/" render={() => <Redirect to={PATH.PROFILE}/>}/>
            //             <Route path={str} render={withSuspense(ProfileContainer)}/>
            //             <Route path={PATH.DIALOGS} render={withSuspense(DialogsContainer)}/>
            //             <Route path={PATH.USERS} render={() => <UsersPage/>}/>
            //             <Route path={PATH.LOGIN} render={() => <LoginPage/>}/>
            //             <Route path="*" render={() => <div>404 NOT FOUND</div>}/>
            //         </Switch>
            //     </div>
            // </div>
            <Layout>
                <Header className="header">
                    <div className="logo"/>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}
                          items={items1}/>
                </Header>
                <Content style={{padding: '0 50px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout className="site-layout-background"
                            style={{padding: '24px 0'}}>
                        <Sider className="site-layout-background" width={200}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                style={{height: '100%'}}
                            >
                                {
                                    [
                                        {
                                            id: '1',
                                            title: 'My Profile',
                                            icon: <UserOutlined/>,
                                            key: [
                                                <Menu.Item key={1.1}><Link
                                                    to={'/profile'}>Profile</Link></Menu.Item>,
                                                <Menu.Item key={1.2}><Link
                                                    to={'/dialogs'}>Messages</Link></Menu.Item>
                                            ]
                                        },
                                        {
                                            id: '2',
                                            title: 'Developers',
                                            icon: <TeamOutlined/>,
                                            key: [<Menu.Item key={2.1}><Link
                                                to={'/users'}>Users</Link></Menu.Item>]
                                        }
                                    ].map((item) =>
                                        <SubMenu key={item.id} icon={item.icon} title={item.title}>
                                            {item.key.map((it) => it)}
                                        </SubMenu>)
                                }
                            </Menu>
                        </Sider>
                        <Content style={{padding: '0 24px', minHeight: 280}}>
                            <Switch>
                                <Route exact path="/"
                                       render={() => <Redirect to={PATH.PROFILE}/>}/>
                                <Route path={str}
                                       render={withSuspense(ProfileContainer)}/>
                                <Route path={PATH.DIALOGS}
                                       render={withSuspense(DialogsContainer)}/>
                                <Route path={PATH.USERS} render={() => <UsersPage/>}/>
                                <Route path={PATH.LOGIN} render={() => <LoginPage/>}/>
                                <Route path="*" render={() => <div>404 NOT FOUND</div>}/>
                            </Switch>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant
                    UED</Footer>
            </Layout>
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

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    initialized: state.app.initialized,
    userId: state.auth.id,
})

export default compose<ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
        initializeApp, setGlobalError: appActions.setGlobalError
    }),
    withRouter)(App)