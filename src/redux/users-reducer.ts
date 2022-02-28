import {AppThunk, InferActionTypes} from "./redux-store";
import {followAPI, usersAPI} from "../api/api";

export type UserPhotos = {
    small: string | null
    large: string | null
}
export type UserType = {
    name: string
    id: number
    uniqueUrlName: string | null
    photos: UserPhotos
    status: string | null
    followed: boolean
}

const initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>,
}

export type UsersActionTypes = InferActionTypes<typeof actions>

export type InitialStateType = typeof initialState

const usersReducer = (state: InitialStateType = initialState, action: UsersActionTypes): InitialStateType => {
    switch (action.type) {
        case "FOLLOW":
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: true} : u)}
        case 'UNFOLLOW':
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: false} : u)}
        case 'SET_USERS':
            return {...state, users: action.users}
        case 'SET_CURRENT_PAGE':
            return {...state, currentPage: action.currentPage}
        case 'SET_TOTAL_USERS_COUNT':
            return {...state, totalUsersCount: action.totalUsersCount}
        case 'TOGGLE_IS_FETCHING':
            return {...state, isFetching: action.isFetching}
        case 'TOGGLE_IS_FOLLOWING_PROGRESS':
            return {...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)}
        default:
            return state;
    }
}

export const actions = {
    followSuccess: (userId: number) => ({type: 'FOLLOW', userId} as const),
    unfollowSuccess: (userId: number) => ({type: 'UNFOLLOW', userId} as const),
    setUsers: (users: Array<UserType>) => ({type: 'SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({type: 'SET_CURRENT_PAGE', currentPage} as const),
    setUsersTotalCount: (totalUsersCount: number) => ({type: 'SET_TOTAL_USERS_COUNT', totalUsersCount} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'TOGGLE_IS_FETCHING', isFetching} as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId} as const),
}

export const getUsers = (currentPage: number, pageSize: number): AppThunk => async dispatch => {
    dispatch(actions.toggleIsFetching(true))
    const data = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(actions.toggleIsFetching(false))
    dispatch(actions.setUsers(data.items))
    dispatch(actions.setUsersTotalCount(data.totalCount))
}

export const getUsersOnPage = (pageNumber: number, pageSize: number): AppThunk => async dispatch => {
    dispatch(actions.setCurrentPage(pageNumber))
    dispatch(actions.toggleIsFetching(true))
    const data = await usersAPI.getUsers(pageNumber, pageSize)
    dispatch(actions.toggleIsFetching(false))
    dispatch(actions.setUsers(data.items))
}

export const follow = (userId: number): AppThunk => async dispatch => {
    dispatch(actions.toggleFollowingProgress(true, userId))
    const data = await followAPI.followUser(userId)
    if (data.resultCode === 0) {
        dispatch(actions.followSuccess(userId))
    }
    dispatch(actions.toggleFollowingProgress(false, userId))
}

export const unfollow = (userId: number): AppThunk => async dispatch => {
    dispatch(actions.toggleFollowingProgress(true, userId))
    const data = await followAPI.unfollowUser(userId)
    if (data.resultCode === 0) {
        dispatch(actions.unfollowSuccess(userId))
    }
    dispatch(actions.toggleFollowingProgress(false, userId))
}

export default usersReducer;