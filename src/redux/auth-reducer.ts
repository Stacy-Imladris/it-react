import {AppThunk, InferActionTypes} from "./redux-store";
import {authAPI} from "../api/api";

const initialState = {
    id: null as null | number,
    email: null as null | string,
    login: null as null | string,
    isAuth: false,
}

export type AuthActionTypes = InferActionTypes<typeof actions>

export type InitialStateType = typeof initialState

const authReducer = (state: InitialStateType = initialState, action: AuthActionTypes): InitialStateType => {
    switch (action.type) {
        case "SET_USER_DATA":
            return {...state, ...action.data, isAuth: true}
        default:
            return state;
    }
}

export const actions = {
    setAuthUserData: (id: number, email: string, login: string) => ({type: 'SET_USER_DATA', data: {id, email, login}} as const),
}

export const getAuthUserData = (): AppThunk => {
    return (dispatch) => {
        authAPI.me().then(data => {
            if (data.resultCode === 0) {
                const {id, email, login} = data.data
                dispatch(actions.setAuthUserData(id, email, login))
            }
        })
    }
}

export default authReducer;