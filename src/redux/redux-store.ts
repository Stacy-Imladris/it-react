import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import {FormAction, reducer as formReducer} from 'redux-form'
import {sidebarReducer} from './sidebar-reducer';
import {AuthActionTypes, authReducer} from './auth-reducer';
import {DialogActionTypes, dialogsReducer} from './dialogs-reducer';
import {UsersActionTypes, usersReducer} from './users-reducer';
import {appReducer} from './app-reducer';
import {ProfileActionTypes, profileReducer} from './profile-reducer';

export const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    sidebar: sidebarReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer,
});

export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type InferActionTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type AppActionsType = AuthActionTypes | DialogActionTypes | ProfileActionTypes | UsersActionTypes | FormAction //| SidebarActionTypes
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppActionsType>

// @ts-ignore
window.store = store