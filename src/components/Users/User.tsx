import React from 'react';
import s from './User.module.css';
import userPhoto from '../../assets/images/user.png';
import {NavLink} from 'react-router-dom';
import {AppThunk} from '../../redux/redux-store';
import {UserType} from '../../api/api';

type UserPropsType = {
    user: UserType
    followingInProgress: number[]
    follow: (userId: number) => AppThunk
    unfollow: (userId: number) => AppThunk
}

export const User = ({user, followingInProgress, follow, unfollow}: UserPropsType) => {

    return (
        <div key={user.id}>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + user.id}>
                                <img src={user.photos.small || userPhoto}
                                     className={s.userPhoto}/>
                            </NavLink>
                        </div>
                        <div>
                            {user.followed
                                ? <button disabled={followingInProgress.some(id => id === user.id)}
                                          onClick={() => unfollow(user.id)}>Unfollow</button>
                                : <button disabled={followingInProgress.some(id => id === user.id)}
                                          onClick={() => follow(user.id)}>Follow</button>}
                        </div>
                    </span>
            <span>
                        <span>
                            <div>{user.name}</div>
                            <div>{user.status}</div>
                        </span>
                        <span>
                            <div>{'u.location.country'}</div>
                            <div>{'u.location.city'}</div>
                        </span>
                    </span>
        </div>
    )
}