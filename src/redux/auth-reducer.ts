import {AppThunk, InferActionTypes} from "./redux-store";
import {authAPI} from "../api/api";
import {stopSubmit} from 'redux-form';

const initialState = {
    id: 0,
    email: null as null | string,
    login: null as null | string,
    isAuth: false,
}

export type AuthActionTypes = InferActionTypes<typeof actions>

export type InitialStateType = typeof initialState

const authReducer = (state: InitialStateType = initialState, action: AuthActionTypes): InitialStateType => {
    switch (action.type) {
        case "SET_USER_DATA":
            return {...state, ...action.payload}
        default:
            return state;
    }
}

export const actions = {
    setAuthUserData: (id: number, email: null | string, login: null | string, isAuth: boolean) =>
        ({type: 'SET_USER_DATA', payload: {id, email, login, isAuth}} as const),
}

export const getAuthUserData = (): AppThunk => {
    return (dispatch) => {
        return authAPI.me().then(data => {
            if (data.resultCode === 0) {
                const {id, email, login} = data.data
                dispatch(actions.setAuthUserData(id, email, login, true))
            }
        })
    }
}

export const login = (email: string, password: string, rememberMe: boolean): AppThunk => {
    return (dispatch) => {
        authAPI.login(email, password, rememberMe).then(data => {
            if (data.resultCode === 0) {
                dispatch(getAuthUserData())
            } else {
                let message = data.messages.length > 0 ? data.messages[0] : "Some error"
                dispatch(stopSubmit('login', {_error: message}))
            }
        })
    }
}

export const logout = (): AppThunk => {
    return (dispatch) => {
        authAPI.logout().then(data => {
            if (data.resultCode === 0) {
                dispatch(actions.setAuthUserData(0, null, null, false))
            }
        })
    }
}

export default authReducer;