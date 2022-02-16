import {InferActionTypes} from "./redux-store";

const initialState = {
    id: null as null | number,
    email: null as null | string,
    login: null as null | string,
    isAuth: false,
}

export type ActionTypes = InferActionTypes<typeof actions>

export type InitialStateType = typeof initialState

const authReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
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

export default authReducer;