import {AppThunk, InferActionTypes} from './redux-store';
import {getAuthUserData} from './auth-reducer';

const appInitialState = {
    initialized: false,
    globalError: null as null | string,
}

export const appReducer = (state: AppInitialStateType = appInitialState, action: AppActionTypes): AppInitialStateType => {
    switch (action.type) {
        case "APP/INITIALIZED_SUCCESS":
        case "APP/SET_GLOBAL_ERROR":
            return {...state, ...action.payload}
        default:
            return state
    }
}

export const appActions = {
    initializedSuccess: (initialized: boolean) =>
        ({type: 'APP/INITIALIZED_SUCCESS', payload: {initialized}} as const),
    setGlobalError: (globalError: null | string) =>
        ({type: 'APP/SET_GLOBAL_ERROR', payload: {globalError}} as const),
}

//thunk
export const initializeApp = (): AppThunk => async dispatch => {
    let promise = dispatch(getAuthUserData())
    await Promise.all([promise])
    dispatch(appActions.initializedSuccess(true))
}

//types
export type AppActionTypes = InferActionTypes<typeof appActions>
export type AppInitialStateType = typeof appInitialState