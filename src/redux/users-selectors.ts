import {AppStateType} from './redux-store';
import {createSelector} from 'reselect';

export const getUsersSelector = (state: AppStateType) => state.usersPage.users

export const getUsers = createSelector(getUsersSelector, (users) => users.filter(u => true))
// example of selector with exact parameters

export const getPageSize = (state: AppStateType) => state.usersPage.pageSize

export const getTotalUsersCount = (state: AppStateType) => state.usersPage.totalUsersCount

export const getCurrentPage = (state: AppStateType) => state.usersPage.currentPage

export const getIsFetching = (state: AppStateType) => state.usersPage.isFetching

export const getFollowingInProgress = (state: AppStateType) => state.usersPage.followingInProgress