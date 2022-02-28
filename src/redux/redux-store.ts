import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer, {ProfileActionTypes} from "./profile-reducer";
import dialogsReducer, {DialogActionTypes} from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer, {UsersActionTypes} from "./users-reducer";
import authReducer, {AuthActionTypes} from "./auth-reducer";
import thunkMiddleware, {ThunkAction} from 'redux-thunk'

export const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    sidebar: sidebarReducer,
    auth: authReducer,
});

export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type InferActionTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type AppActionsType = AuthActionTypes | DialogActionTypes | ProfileActionTypes | UsersActionTypes //| SidebarActionTypes
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppActionsType>

// @ts-ignore
window.store = store