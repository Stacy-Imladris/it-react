import React from 'react';
import {UsersPropsType} from "./UsersContainer";
import s from './Users.module.css'

export const Users = (props: UsersPropsType) => {

    if (props.users.length === 0) {
        props.setUsers([
            {id: 1, photoUrl: 'https://photonomy.ru/uploads/images/miniatures/mqrUs8Ksk455xozxkvwudd0iyhwdMMgb_low.jpg',
                followed: true, fullName: 'Anna', status: 'I am a boss', location: {city: 'Minsk', country: 'Belarus'}},
            {id: 2, photoUrl: 'https://www.ejin.ru/wp-content/uploads/2017/12/zhivotnye-v-odezhde-kartinki-na-avu.jpg',
                followed: false, fullName: 'Ilya', status: 'I am not a boss', location: {city: 'Svetlogorsk', country: 'Belarus'}},
            {id: 3, photoUrl: 'https://avatarko.ru/img/kartinka/1/zhivotnye_morskaya_svinka.jpg',
                followed: false, fullName: 'Olya', status: 'Am I a boss?', location: {city: 'Gomel', country: 'Belarus'}},
            {id: 4, photoUrl: 'https://i.pinimg.com/736x/0a/65/1a/0a651a1bbf44104b6e29991129784fba--fluffy-pets-instagram-feed.jpg',
                followed: true, fullName: 'Roma', status: 'I am a boss too', location: {city: 'Mogilev', country: 'Belarus'}},
        ])
    }

    return (
        <div>
            {
                props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <img src={u.photoUrl} className={s.userPhoto}/>
                        </div>
                        <div>
                            <button onClick={() => props.changeFollow(u.id)}>{u.followed ? 'Unfollow' : 'Follow'}</button>
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{u.fullName}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            <div>{u.location.country}</div>
                            <div>{u.location.city}</div>
                        </span>
                    </span>
                </div>)
            }
        </div>
    )
}