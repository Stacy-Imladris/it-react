import {AppThunk, InferActionTypes} from './redux-store';
import {ProfileDataFormPropsType} from 'components/Profile/ProfileInfo/ProfileDataForm/ProfileDataForm';
import {stopSubmit} from 'redux-form';
import {ResultCodes} from 'enums/resultCodes';
import {profileAPI, ProfileType} from 'api/profile-api';
import {UserPhotos} from 'api/users-api';

const profileInitialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 3},
        {id: 2, message: 'It\'s my first post', likesCount: 23},
        {id: 3, message: 'Blabla', likesCount: 17},
        {id: 4, message: 'Dadada', likesCount: 99},
    ] as Array<PostType>,
    profile: null as null | ProfileType,
    status: '',
    isEditMode: false,
}

export const profileReducer = (state: ProfileInitialStateType = profileInitialState, action: ProfileActionTypes): ProfileInitialStateType => {
    switch (action.type) {
        case 'PROFILE/ADD_POST': {
            const newPost: PostType = {id: new Date().getTime(), message: action.payload.postText, likesCount: 0}
            return {...state, posts: [...state.posts, newPost]}
        }
        case 'PROFILE/DELETE_POST':
            return {...state, posts: state.posts.filter(f => f.id !== action.payload.postId)}
        case 'PROFILE/SAVE_PHOTO_SUCCESS':
            return {...state, profile: {...state.profile, ...action.payload}}
        case 'PROFILE/SET_USER_PROFILE':
        case 'PROFILE/SET_STATUS':
        case 'PROFILE/SET_EDIT_MODE':
            return {...state, ...action.payload}
        default:
            return state
    }
}

export const profileActions = {
    addPost: (postText: string) =>
        ({type: 'PROFILE/ADD_POST', payload: {postText}} as const),
    deletePost: (postId: number) =>
        ({type: 'PROFILE/DELETE_POST', payload: {postId}} as const),
    setUserProfile: (profile: null | ProfileType) =>
        ({type: 'PROFILE/SET_USER_PROFILE', payload: {profile}} as const),
    setStatus: (status: string) =>
        ({type: 'PROFILE/SET_STATUS', payload: {status}} as const),
    setEditMode: (isEditMode: boolean) =>
        ({type: 'PROFILE/SET_EDIT_MODE', payload: {isEditMode}} as const),
    savePhotoSuccess: (photos: UserPhotos) =>
        ({type: 'PROFILE/SAVE_PHOTO_SUCCESS', payload: {photos}} as const),
}

//thunks
export const getUserProfile = (userId: number): AppThunk => async dispatch => {
    const data = await profileAPI.getProfile(userId)
    dispatch(profileActions.setUserProfile(data))
}
export const getStatus = (userId: number): AppThunk => async dispatch => {
    const data = await profileAPI.getStatus(userId)
    dispatch(profileActions.setStatus(data))
}
export const updateStatus = (status: string): AppThunk => async dispatch => {
    const data = await profileAPI.updateStatus(status)
    if (data.resultCode === ResultCodes.Success) {
        dispatch(profileActions.setStatus(status))
    }
}
export const savePhoto = (file: string | Blob): AppThunk => async dispatch => {
    const data = await profileAPI.savePhoto(file)
    if (data.resultCode === ResultCodes.Success) {
        dispatch(profileActions.savePhotoSuccess(data.data.photos))
    }
}
export const saveProfile = (profile: ProfileDataFormPropsType): AppThunk => async (dispatch, getState) => {
    const userId = getState().auth.id
    const data = await profileAPI.saveProfile(profile)
    if (data.resultCode === ResultCodes.Success) {
        dispatch(getUserProfile(userId))
        dispatch(profileActions.setEditMode(false))
    } else {
        dispatch(stopSubmit('edit-profile', {_error: data.messages[0]}))
    }
}

//types
export type ProfileActionTypes = InferActionTypes<typeof profileActions>
export type ProfileInitialStateType = typeof profileInitialState
export type PostType = {
    id: number
    message: string
    likesCount: number
}