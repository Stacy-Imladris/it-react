import {AppThunk} from '../../redux/redux-store';
import {Paginator} from '../common/Paginator/Paginator';
import {User} from './User/User';
import {UserType} from '../../api/users-api';
import {UsersSearchForm} from './UsersSearchForm';
import {FilterType} from '../../redux/users-reducer';

type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    follow: (userId: number) => AppThunk
    unfollow: (userId: number) => AppThunk
    followingInProgress: Array<number>
    onFilterChanged: (filter: FilterType) => void
}

export const Users = ({
                          users, currentPage, onPageChanged, totalUsersCount, pageSize,
                          followingInProgress, follow, unfollow,onFilterChanged
                      }: UsersPropsType) => (
    <div>
        <UsersSearchForm onFilterChanged={onFilterChanged}/>
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                   totalUsersCount={totalUsersCount} pageSize={pageSize}/>
        {users.map(u => <User key={u.id} user={u} follow={follow} unfollow={unfollow}
                              followingInProgress={followingInProgress}/>)}
    </div>
)