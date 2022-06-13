import {connect} from 'react-redux';
import {AppStateType, AppThunk} from '../../redux/redux-store';
import {
    FilterType, follow, requestUsers, unfollow, usersActions, UsersInitialStateType
} from '../../redux/users-reducer';
import {Users} from './Users';
import {Preloader} from '../common/Preloader/Preloader';
import {compose} from 'redux';
import {
    getCurrentPage, getUsersFilter, getFollowingInProgress, getIsFetching, getPageSize,
    getTotalUsersCount, getUsers
} from '../../redux/users-selectors';
import {Component, ComponentType} from 'react';

class UsersContainer extends Component<UsersContainerPropsType> {
    componentDidMount() {
        const {currentPage, pageSize, filter} = this.props
        this.props.requestUsers(currentPage, pageSize, filter)
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize, filter} = this.props
        this.props.requestUsers(pageNumber, pageSize, filter)
    }

    onFilterChanged = (filter: FilterType) => {
        const {pageSize} = this.props
        this.props.requestUsers(1, pageSize, filter)
    }

    render() {
        return this.props.isFetching ? <Preloader/>
            : <Users totalUsersCount={this.props.totalUsersCount}
                     pageSize={this.props.pageSize}
                     currentPage={this.props.currentPage}
                     onPageChanged={this.onPageChanged}
                     users={this.props.users}
                     follow={this.props.follow}
                     unfollow={this.props.unfollow}
                     followingInProgress={this.props.followingInProgress}
                     onFilterChanged={this.onFilterChanged}/>
    }
}

type MapStatePropsType = UsersInitialStateType
type MapDispatchPropsType = {
    follow: (userId: number) => AppThunk
    unfollow: (userId: number) => AppThunk
    setCurrentPage: (pageNumber: number) => void
    requestUsers: (currentPage: number, pageSize: number, filter: FilterType) => AppThunk
}
export type UsersContainerPropsType = MapStatePropsType & MapDispatchPropsType

/*const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        follow: (userId: number) => {
            dispatch(follow(userId))
        },
        unfollow: (userId: number) => {
            dispatch(unfollow(userId))
        },
        setUsers: (users: Array<UserType>) => {
            dispatch(setUsers(users))
        },
        setCurrentPage: (pageNumber: number) => {
            dispatch(setCurrentPage(pageNumber))
        },
        setTotalUsersCount: (totalCount: number) => {
            dispatch(setUsersTotalCount(totalCount))
        },
        toggleIsFetching: (isFetching: boolean) => {
            dispatch(toggleIsFetching(isFetching))
        },
    }
}*/
const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
    filter: getUsersFilter(state)
})

export default compose<ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
        follow, unfollow, setCurrentPage: usersActions.setCurrentPage, requestUsers
    }),
)(UsersContainer)