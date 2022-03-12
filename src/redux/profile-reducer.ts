import {UserPhotos} from './users-reducer';
import {AppThunk, InferActionTypes} from './redux-store';
import {profileAPI} from '../api/api';

export type PostType = {
    id: number
    message: string
    likesCount: number
}
export type ContactType = {
    [key: string]: string | null
}
export type ProfileType = {
    aboutMe: string
    contacts: ContactType
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: UserPhotos
}

const initialState = {
    messageForNewPost: '',
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 3},
        {id: 2, message: 'It\'s my first post', likesCount: 23},
        {id: 3, message: 'Blabla', likesCount: 17},
        {id: 4, message: 'Dadada', likesCount: 99},
    ] as Array<PostType>,
    profile: null as null | ProfileType,
    status: ''
}

export type ProfileActionTypes = InferActionTypes<typeof actions>

export type InitialStateType = typeof initialState

const profileReducer = (state: InitialStateType = initialState, action: ProfileActionTypes): InitialStateType => {
    switch (action.type) {
        case 'ADD_POST': {
            const newPost: PostType = {
                id: new Date().getTime(),
                message: action.messageForNewPost,
                likesCount: 0,
            };
            return {...state, messageForNewPost: '', posts: [...state.posts, newPost]}
        }
        case 'CHANGE_NEW_TEXT':
            return {...state, messageForNewPost: action.newText}
        case 'SET_USER_PROFILE':
            return {...state, profile: action.profile}
        case 'SET_STATUS':
            return {...state, status: action.status}
        default:
            return state;
    }
}

export const actions = {
    addPost: (postText: string) => ({type: 'ADD_POST', messageForNewPost: postText} as const),
    changeNewText: (newText: string) => ({type: 'CHANGE_NEW_TEXT', newText: newText} as const),
    setUserProfile: (profile: null | ProfileType) => ({type: 'SET_USER_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'SET_STATUS', status} as const),
}

export const getUserProfile = (userId: number): AppThunk => dispatch => {
    profileAPI.getProfile(userId).then(data => {
        dispatch(actions.setUserProfile(data))
    })
}

export const getStatus = (userId: number): AppThunk => dispatch => {
    profileAPI.getStatus(userId).then(data => {
        dispatch(actions.setStatus(data))
    })
}

export const updateStatus = (status: string): AppThunk => dispatch => {
    profileAPI.updateStatus(status).then(data => {
        if (data.resultCode === 0) {
            dispatch(actions.setStatus(status))
        }
    })
}

export default profileReducer;