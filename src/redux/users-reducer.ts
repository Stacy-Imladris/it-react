import {AppThunk, InferActionTypes} from './redux-store';
import {Dispatch} from 'redux';
import {ResultCodes} from '../enums/resultCodes';
import {usersAPI, UserType} from '../api/users-api';
import {followAPI} from '../api/follow-api';
import {ResponseType} from '../api/api';

const usersInitialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>,
    filter: {
        term: '',
        friend: null as null | boolean
    } as FilterType
}

export const usersReducer = (state: UsersInitialStateType = usersInitialState, action: UsersActionTypes): UsersInitialStateType => {
    switch (action.type) {
        case 'USERS/FOLLOW':
            return {
                ...state, users: state.users.map(u => u.id === action.payload.userId
                    ? {...u, followed: true} : u)
            }
        case 'USERS/UNFOLLOW':
            return {
                ...state, users: state.users.map(u => u.id === action.payload.userId
                    ? {...u, followed: false} : u)
            }
        case 'USERS/SET_USERS':
        case 'USERS/SET_CURRENT_PAGE':
        case 'USERS/SET_TOTAL_USERS_COUNT':
        case 'USERS/TOGGLE_IS_FETCHING':
        case 'USERS/SET_FILTER':
            return {...state, ...action.payload}
        case 'USERS/TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state, followingInProgress: action.payload.isFetching
                    ? [...state.followingInProgress, action.payload.userId]
                    : state.followingInProgress.filter(id => id !== action.payload.userId)
            }
        default:
            return state
    }
}

export const usersActions = {
    followSuccess: (userId: number) =>
        ({type: 'USERS/FOLLOW', payload: {userId}} as const),
    unfollowSuccess: (userId: number) =>
        ({type: 'USERS/UNFOLLOW', payload: {userId}} as const),
    setUsers: (users: Array<UserType>) =>
        ({type: 'USERS/SET_USERS', payload: {users}} as const),
    setCurrentPage: (currentPage: number) =>
        ({type: 'USERS/SET_CURRENT_PAGE', payload: {currentPage}} as const),
    setUsersTotalCount: (totalUsersCount: number) =>
        ({type: 'USERS/SET_TOTAL_USERS_COUNT', payload: {totalUsersCount}} as const),
    toggleIsFetching: (isFetching: boolean) =>
        ({type: 'USERS/TOGGLE_IS_FETCHING', payload: {isFetching}} as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) =>
        ({type: 'USERS/TOGGLE_IS_FOLLOWING_PROGRESS', payload: {isFetching, userId}} as const),
    setFilter: (filter: FilterType) => ({type: 'USERS/SET_FILTER', payload: {filter}} as const),
}

const followUnfollowFlow = async (dispatch: Dispatch<UsersActionTypes>,
                                  userId: number,
                                  apiMethod: (id: number) => Promise<ResponseType>,
                                  actionCreator: (userId: number) => ReturnType<typeof usersActions.followSuccess>
                                      | ReturnType<typeof usersActions.unfollowSuccess>) => {
    dispatch(usersActions.toggleFollowingProgress(true, userId))
    const data = await apiMethod(userId)
    if (data.resultCode === ResultCodes.Success) {
        dispatch(actionCreator(userId))
    }
    dispatch(usersActions.toggleFollowingProgress(false, userId))
}

//thunks
export const requestUsers = (page: number, pageSize: number, filter: FilterType): AppThunk => async dispatch => {
    dispatch(usersActions.toggleIsFetching(true))
    dispatch(usersActions.setCurrentPage(page))
    dispatch(usersActions.setFilter(filter))
    const data = await usersAPI.getUsers(page, pageSize, filter)
    dispatch(usersActions.setUsers(data.items))
    dispatch(usersActions.setUsersTotalCount(data.totalCount))
    dispatch(usersActions.toggleIsFetching(false))
}
export const follow = (userId: number): AppThunk => async dispatch => {
    return await followUnfollowFlow(dispatch, userId, followAPI.followUser.bind(followAPI),
        usersActions.followSuccess)
}
export const unfollow = (userId: number): AppThunk => async dispatch => {
    return await followUnfollowFlow(dispatch, userId, followAPI.unfollowUser.bind(followAPI),
        usersActions.unfollowSuccess)
}

//types
export type UsersActionTypes = InferActionTypes<typeof usersActions>
export type UsersInitialStateType = typeof usersInitialState
export type FilterType = {
    term: string
    friend: null | boolean
}