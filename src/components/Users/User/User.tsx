import s from './User.module.scss';
import userPhoto from '../../../assets/images/user.png';
import {NavLink} from 'react-router-dom';
import {UserType} from '../../../api/users-api';

type UserPropsType = {
    user: UserType
    followingInProgress: number[]
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

export const User = ({user, followingInProgress, follow, unfollow}: UserPropsType) => (
    <div>
        <div>
            <NavLink to={'/profile/' + user.id}>
                <img src={user.photos.small || userPhoto} className={s.userPhoto}
                     alt={'user\'s avatar'}/>
            </NavLink>
        </div>
        <div>
            {user.followed
                ? <button disabled={followingInProgress.some(id => id === user.id)}
                          onClick={() => unfollow(user.id)}>Unfollow</button>
                : <button disabled={followingInProgress.some(id => id === user.id)}
                          onClick={() => follow(user.id)}>Follow</button>}
        </div>
        <div>{user.name}</div>
        <div>{user.status}</div>
        <div>{'here will be "u.location.country"'}</div>
        <div>{'here will be "u.location.city"'}</div>
    </div>
)