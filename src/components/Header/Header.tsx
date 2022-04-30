import s from './Header.module.scss'
import {NavLink} from 'react-router-dom'
import {HeaderPropsType} from './HeaderContainer'

export const Header = ({login, isAuth, logout}: HeaderPropsType) => (
    <header className={s.header}>
        <div className={s.container}>
            <img src="https://www.freeiconspng.com/uploads/tesv-skyrim-icon-png-28.png"
                 alt={'logo'}/>
            <div className={s.loginBlock}>
                {
                    isAuth
                    ? <div>{login} - <button onClick={logout}>Log out</button></div>
                    : <NavLink to={'/login'}>Login</NavLink>
                }
            </div>
        </div>
    </header>
)