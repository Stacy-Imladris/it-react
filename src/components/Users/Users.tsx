import React from 'react';
import s from './Users.module.css';
import userPhoto from '../../assets/images/user.png';
import {UserType} from '../../redux/users-reducer';
import {NavLink} from 'react-router-dom';
import {AppThunk} from '../../redux/redux-store';

type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    follow: (userId: number) => AppThunk
    unfollow: (userId: number) => AppThunk
    followingInProgress: Array<number>
}

export const Users = ({currentPage, onPageChanged, ...props}: UsersPropsType) => {

    const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    const pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const pagesForRender = currentPage <= 3 ? [1, 2, 3, 4, 5]
        : currentPage > pages.length - 3 ? [pages.length - 4, pages.length - 3, pages.length - 2, pages.length - 1, pages.length]
            : [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2]

    return (
        <div>
            <div>
                {currentPage > 3 ? <span><span onClick={() => onPageChanged(currentPage - 1)}>Предыдущая</span>
                    <span className={currentPage === 1 ? s.selectedPage : ''}
                          onClick={() => onPageChanged(1)}> {1} ...</span></span> : null}
                {pagesForRender.map((p, i) => <span className={currentPage === p ? s.selectedPage : ''}
                                                    onClick={() => onPageChanged(p)} key={String(p) + i}> {p} </span>)}
                {currentPage < pages.length - 2 ? <span><span className={currentPage === pages.length ? s.selectedPage : ''}
                          onClick={() => onPageChanged(pages.length)}>... {pages.length} </span>
                    <span onClick={() => onPageChanged(currentPage + 1)}>Следующая</span></span> : null}
            </div>
            {props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + u.id}>
                                <img src={u.photos.small !== null ? u.photos.small : userPhoto} className={s.userPhoto}/>
                            </NavLink>
                        </div>
                        <div>
                            {u.followed
                                ? <button disabled={props.followingInProgress.some(id => id === u.id)}
                                          onClick={() => props.unfollow(u.id)}>Unfollow</button>
                                : <button disabled={props.followingInProgress.some(id => id === u.id)}
                                          onClick={() => props.follow(u.id)}>Follow</button>}
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            <div>{'u.location.country'}</div>
                            <div>{'u.location.city'}</div>
                        </span>
                    </span>
                </div>)
            }
        </div>
    )
}