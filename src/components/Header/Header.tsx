import {Link} from 'react-router-dom'
import {Avatar, Button, Col, Layout, Menu, Row} from 'antd';
import {PATH} from '../../enums/paths';
import {UserOutlined} from '@ant-design/icons';
import {useAppSelector} from '../../redux/redux-store';
import {useDispatch} from 'react-redux';
import {selectCurrentUserLogin, selectIsAuth} from '../../redux/auth-selectors';
import {logout} from '../../redux/auth-reducer';

const {Header} = Layout;

export const AppHeader = () => {
    const isAuth = useAppSelector(selectIsAuth)
    const login = useAppSelector(selectCurrentUserLogin)

    const dispatch = useDispatch()

    const logoutCallback = () => {
        dispatch(logout())
    }

    return <Header className="header">
        <div className="logo"/>
        <Row>
            <Col span={21}>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key={'1'}>
                        <Link to={PATH.DEVELOPERS}>Developers</Link>
                    </Menu.Item>
                </Menu>
            </Col>
            {
                isAuth
                    ? <><Col span={1}>
                        <Avatar alt={login || ''} style={{backgroundColor: '#87d068'}}
                                icon={<UserOutlined/>}/></Col>
                        <Col span={1}><span style={{color: 'white'}}>{login}</span></Col>
                        <Col span={1}><Button onClick={logoutCallback}>Log
                            out</Button></Col></>
                    : <Col span={3}><Button><Link to={PATH.LOGIN}>Login</Link></Button></Col>
            }
        </Row>
    </Header>
}