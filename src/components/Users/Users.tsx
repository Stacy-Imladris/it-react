import React from 'react';
import s from "./Users.module.css";
import userPhoto from "../../assets/images/user.png";
import {UserType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";
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

export const Users = (props: UsersPropsType) => {

    const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    const pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const pagesForRender = props.currentPage <= 3 ? [1, 2, 3, 4, 5]
        : props.currentPage > pages.length - 3 ? [pages.length - 4, pages.length - 3, pages.length - 2, pages.length - 1, pages.length]
            : [props.currentPage - 2, props.currentPage - 1, props.currentPage, props.currentPage + 1, props.currentPage + 2]

    return (
        <div>
            <div>
                {props.currentPage > 3 ? <span onClick={(e) => {
                    props.onPageChanged(props.currentPage - 1)}}>Предыдущая</span> : null}
                {props.currentPage > 3 ?
                    <span className={props.currentPage === 1 ? s.selectedPage : ''}
                          onClick={(e) => {
                              props.onPageChanged(1)}}> {1} ...</span> : null}
                {pagesForRender.map((p, i) => {
                    return <span className={props.currentPage === p ? s.selectedPage : ''}
                                 onClick={(e) => {
                                     props.onPageChanged(p)
                                 }} key={String(p) + i}> {p} </span>})}
                {props.currentPage < pages.length - 2 ?
                    <span className={props.currentPage === pages.length ? s.selectedPage : ''}
                          onClick={(e) => {
                              props.onPageChanged(pages.length)}}>... {pages.length} </span> : null}
                {props.currentPage < pages.length - 2 ? <span onClick={(e) => {
                    props.onPageChanged(props.currentPage + 1)}}>Следующая</span> : null}
            </div>
            {
                props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + u.id}>
                                <img src={u.photos.small !== null ? u.photos.small : userPhoto}
                                     className={s.userPhoto}/>
                            </NavLink>
                        </div>
                        <div>
                            {u.followed
                                ? <button disabled={props.followingInProgress.some(id => id === u.id)}
                                          onClick={() => {props.unfollow(u.id)}}>Unfollow</button>
                                : <button disabled={props.followingInProgress.some(id => id === u.id)}
                                          onClick={() => {props.follow(u.id)}}>Follow</button>
                            }
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