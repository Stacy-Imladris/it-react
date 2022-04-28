import {AppThunk, InferActionTypes} from './redux-store';
import {followAPI, usersAPI, UserType} from '../api/api';
import {Dispatch} from 'redux';

const usersInitialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>,
}

export const usersReducer = (state: UsersInitialStateType = usersInitialState, action: UsersActionTypes): UsersInitialStateType => {
    switch (action.type) {
        case 'USERS/FOLLOW':
            return {...state, users: state.users.map(u => u.id === action.payload.userId ? {...u, followed: true} : u)}
        case 'USERS/UNFOLLOW':
            return {...state, users: state.users.map(u => u.id === action.payload.userId ? {...u, followed: false} : u)}
        case 'USERS/SET_USERS':
        case 'USERS/SET_CURRENT_PAGE':
        case 'USERS/SET_TOTAL_USERS_COUNT':
        case 'USERS/TOGGLE_IS_FETCHING':
            return {...state, ...action.payload}
        case 'USERS/TOGGLE_IS_FOLLOWING_PROGRESS':
            return {...state, followingInProgress: action.payload.isFetching
                    ? [...state.followingInProgress, action.payload.userId]
                    : state.followingInProgress.filter(id => id !== action.payload.userId)
            }
        default:
            return state;
    }
}

export const usersActions = {
    followSuccess: (userId: number) => ({type: 'USERS/FOLLOW', payload: {userId}} as const),
    unfollowSuccess: (userId: number) => ({type: 'USERS/UNFOLLOW', payload: {userId}} as const),
    setUsers: (users: Array<UserType>) => ({type: 'USERS/SET_USERS', payload: {users}} as const),
    setCurrentPage: (currentPage: number) => ({type: 'USERS/SET_CURRENT_PAGE', payload: {currentPage}} as const),
    setUsersTotalCount: (totalUsersCount: number) =>
        ({type: 'USERS/SET_TOTAL_USERS_COUNT', payload: {totalUsersCount}} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'USERS/TOGGLE_IS_FETCHING', payload: {isFetching}} as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) =>
        ({type: 'USERS/TOGGLE_IS_FOLLOWING_PROGRESS', payload: {isFetching, userId}} as const),
}

const followUnfollowFlow = async (dispatch: Dispatch<UsersActionTypes>,
                                  userId: number, apiMethod: (id: number) => Promise<PromiseType>,
                                  actionCreator: (userId: number) => ReturnType<typeof usersActions.followSuccess>
                                      | ReturnType<typeof usersActions.unfollowSuccess>) => {
    dispatch(usersActions.toggleFollowingProgress(true, userId))
    const data = await apiMethod(userId)
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(usersActions.toggleFollowingProgress(false, userId))
}

//thunks
export const requestUsers = (page: number, pageSize: number): AppThunk => async dispatch => {
    dispatch(usersActions.toggleIsFetching(true))
    dispatch(usersActions.setCurrentPage(page))
    const data = await usersAPI.getUsers(page, pageSize)
    dispatch(usersActions.toggleIsFetching(false))
    dispatch(usersActions.setUsers(data.items))
    dispatch(usersActions.setUsersTotalCount(data.totalCount))
}
export const follow = (userId: number): AppThunk => async dispatch => {
    await followUnfollowFlow(dispatch, userId, followAPI.followUser.bind(followAPI), usersActions.followSuccess)
}
export const unfollow = (userId: number): AppThunk => async dispatch => {
    await followUnfollowFlow(dispatch, userId, followAPI.unfollowUser.bind(followAPI), usersActions.unfollowSuccess)
}

//types
type PromiseType<T = {}> = {
    resultCode: number
    messages: string[]
    data: T
}
export type UsersActionTypes = InferActionTypes<typeof usersActions>
export type UsersInitialStateType = typeof usersInitialState