import {useAppSelector} from '../../redux/redux-store';
import {Paginator} from '../common/Paginator/Paginator';
import {User} from './User/User';
import {UsersSearchForm} from './UsersSearchForm';
import {FilterType, follow, requestUsers, unfollow} from '../../redux/users-reducer';
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from '../../redux/users-selectors';
import {useDispatch} from 'react-redux';
import {useEffect} from 'react';

export const Users = () => {
    const users = useAppSelector(getUsers)
    const totalUsersCount = useAppSelector(getTotalUsersCount)
    const currentPage = useAppSelector(getCurrentPage)
    const pageSize = useAppSelector(getPageSize)
    const filter = useAppSelector(getUsersFilter)
    const followingInProgress = useAppSelector(getFollowingInProgress)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [dispatch])

    const followUser = (userId: number) => {
        dispatch(follow(userId))
    }

    const unfollowUser = (userId: number) => {
        dispatch(unfollow(userId))
    }

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }

    return (
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged}/>
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                       totalUsersCount={totalUsersCount} pageSize={pageSize}/>
            {users.map(u => <User key={u.id} user={u} follow={followUser} unfollow={unfollowUser}
                                  followingInProgress={followingInProgress}/>)}
        </div>
    )
}