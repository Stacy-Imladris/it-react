import {AppThunk, InferActionTypes} from './redux-store';
import {authAPI} from '../api/api';
import {stopSubmit} from 'redux-form';

const authInitialState = {
    id: 0,
    email: null as null | string,
    login: null as null | string,
    isAuth: false,
}

export const authReducer = (state: AuthInitialStateType = authInitialState, action: AuthActionTypes): AuthInitialStateType => {
    switch (action.type) {
        case 'AUTH/SET_USER_DATA':
            return {...state, ...action.payload}
        default:
            return state;
    }
}

export const authActions = {
    setAuthUserData: (id: number, email: null | string, login: null | string, isAuth: boolean) =>
        ({type: 'AUTH/SET_USER_DATA', payload: {id, email, login, isAuth}} as const),
}

//thunks
export const getAuthUserData = (): AppThunk<Promise<void>> => async dispatch => { // типизация Promise
    const data = await authAPI.me()
    if (data.resultCode === 0) {
        const {id, email, login} = data.data
        dispatch(authActions.setAuthUserData(id, email, login, true))
    }
}
export const login = (email: string, password: string, rememberMe: boolean): AppThunk => async dispatch => {
    const data = await authAPI.login(email, password, rememberMe)
    if (data.resultCode === 0) {
        await dispatch(getAuthUserData())
    } else {
        const message = data.messages.length > 0 ? data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', {_error: message}))
    }
}
export const logout = (): AppThunk => async dispatch => {
    const data = await authAPI.logout()
    if (data.resultCode === 0) {
        dispatch(authActions.setAuthUserData(0, null, null, false))
    }
}

//types
export type AuthActionTypes = InferActionTypes<typeof authActions>
export type AuthInitialStateType = typeof authInitialState