import {NavLink} from 'react-router-dom'
import s from './Navbar.module.scss'
import {SidebarContainer} from './Sidebar/SidebarContainer'
import cn from 'classnames'

export const Navbar = () => (
    <nav className={s.nav}>
        <div className={cn(s.item, s.active)}>
            <NavLink to="/profile" activeClassName={s.active}>Profile</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to="/dialogs" activeClassName={s.active}>Messages</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to="/users" activeClassName={s.active}>Users</NavLink>
        </div>
        <div className={s.item}><a>News</a></div>
        <div className={s.item}><a>Music</a></div>
        <div className={s.item}><a>Settings</a></div>
        <div><SidebarContainer/></div>
    </nav>
)