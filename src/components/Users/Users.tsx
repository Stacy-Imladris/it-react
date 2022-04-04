import React from 'react';
import {AppThunk} from '../../redux/redux-store';
import {UserType} from '../../api/api';
import {Paginator} from '../common/Paginator/Paginator';
import {User} from './User';

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

export const Users = ({users, currentPage, onPageChanged, totalUsersCount, pageSize, followingInProgress, follow, unfollow}: UsersPropsType) => {

    return (
        <div>
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                       totalUsersCount={totalUsersCount} pageSize={pageSize}/>
            {users.map(u => <User key={u.id} user={u} follow={follow} unfollow={unfollow}
                                  followingInProgress={followingInProgress}/>)}
        </div>
    )
}