import {AppThunk, InferActionTypes} from './redux-store';
import {getAuthUserData} from './auth-reducer';

const initialState = {
    initialized: false,
}

export type AppActionTypes = InferActionTypes<typeof actions>

export type InitialStateType = typeof initialState

const appReducer = (state: InitialStateType = initialState, action: AppActionTypes): InitialStateType => {
    switch (action.type) {
        case "INITIALIZED_SUCCESS":
            return {...state, initialized: true}
        default:
            return state;
    }
}

export const actions = {
    initializedSuccess: () => ({type: 'INITIALIZED_SUCCESS'} as const),
}

export const initializeApp = (): AppThunk => (dispatch) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise]).then(() => {
        dispatch(actions.initializedSuccess())
    })
}

export default appReducer;