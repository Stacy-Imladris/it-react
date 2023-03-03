import s from './Sidebar.module.scss';
import {SidebarPropsType} from './SidebarContainer';
import {FriendType} from 'redux/sidebar-reducer';

export const Sidebar = ({sidebar}: SidebarPropsType) => {
    const friendElements = sidebar.friends.map(({id, img, name}: FriendType) => (
            <div key={id}>
                <div><img src={img} alt={'friend image'}/></div>
                <div>{name}</div>
            </div>
        )
    )

    return (
        <div className={s.sidebar}>
            <div className={s.title}>Friends</div>
            <div className={s.friends}>{friendElements}</div>
        </div>
    )
}