import {AppThunk, InferActionTypes} from './redux-store';
import {getAuthUserData} from './auth-reducer';

const appInitialState = {
    initialized: false,
}

export const appReducer = (state: AppInitialStateType = appInitialState, action: AppActionTypes): AppInitialStateType => {
    switch (action.type) {
        case "APP/INITIALIZED_SUCCESS":
            return {...state, initialized: true}
        default:
            return state;
    }
}

export const appActions = {
    initializedSuccess: () => ({type: 'APP/INITIALIZED_SUCCESS'} as const),
}

//thunk
export const initializeApp = (): AppThunk => async dispatch => {
    let promise = dispatch(getAuthUserData())
    await Promise.all([promise])
    dispatch(appActions.initializedSuccess())
}

//types
export type AppActionTypes = InferActionTypes<typeof appActions>
export type AppInitialStateType = typeof appInitialState