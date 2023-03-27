import {AppThunk, InferActionTypes} from './redux-store';
import {stopSubmit} from 'redux-form';
import {ResultCodes} from 'enums/resultCodes';
import {authAPI, LoginPayloadType} from 'api/auth-api';
import {securityAPI} from 'api/security-api';

const authInitialState = {
    id: 0,
    email: null as null | string,
    login: null as null | string,
    isAuth: false,
    captchaUrl: null as null | string // if null, then captcha is not required
}

export const authReducer = (state: AuthInitialStateType = authInitialState, action: AuthActionTypes): AuthInitialStateType => {
    switch (action.type) {
        case 'AUTH/SET_USER_DATA':
        case 'AUTH/SET_CAPTCHA_URL_SUCCESS':
            return {...state, ...action.payload}
        default:
            return state
    }
}

export const authActions = {
    setAuthUserData: (id: number, email: null | string, login: null | string, isAuth: boolean) =>
        ({type: 'AUTH/SET_USER_DATA', payload: {id, email, login, isAuth}} as const),
    setCaptchaUrlSuccess: (captchaUrl: null | string) =>
        ({type: 'AUTH/SET_CAPTCHA_URL_SUCCESS', payload: {captchaUrl}} as const),
}

//thunks
export const getAuthUserData = (): AppThunk<Promise<void>> => async dispatch => { // типизация Promise
    const data = await authAPI.me()
    if (data.resultCode === ResultCodes.Success) {
        const {id, email, login} = data.data
        dispatch(authActions.setAuthUserData(id, email, login, true))
    }
}
export const login = (loginPayload: LoginPayloadType): AppThunk => async dispatch => {
    const data = await authAPI.login(loginPayload)
    if (data.resultCode === ResultCodes.Success) {
        await dispatch(getAuthUserData())
    } else {
        if (data.resultCode === ResultCodes.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        }
        const message = data.messages.length > 0 ? data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', {_error: message}))
    }
}
export const getCaptchaUrl = (): AppThunk => async dispatch => {
    const captchaUrl = await securityAPI.getCaptchaUrl()
    dispatch(authActions.setCaptchaUrlSuccess(captchaUrl))

}
export const logout = (): AppThunk => async dispatch => {
    const data = await authAPI.logout()
    if (data.resultCode === ResultCodes.Success) {
        dispatch(authActions.setAuthUserData(0, null, null, false))
        dispatch(authActions.setCaptchaUrlSuccess(null))
    }
}

//types
export type AuthActionTypes = InferActionTypes<typeof authActions>
export type AuthInitialStateType = typeof authInitialState