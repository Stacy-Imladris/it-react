import {ActionsTypes} from "./store";
import {UserPhotos} from "./users-reducer";

const ADD_POST = 'ADD_POST'
const CHANGE_NEW_TEXT = 'CHANGE_NEW_TEXT'
const SET_USER_PROFILE = 'SET_USER_PROFILE'

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
    profile: {} as null | ProfileType
}

export type InitialStateType = typeof initialState

const profileReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case ADD_POST: {
            const newPost: PostType = {
                id: new Date().getTime(),
                message: action.messageForNewPost,
                likesCount: 0,
            };
            return {...state, messageForNewPost: '', posts: [...state.posts, newPost]}
        }
        case CHANGE_NEW_TEXT:
            return {...state, messageForNewPost: action.newText}
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}
        default:
            return state;
    }
}

export const addPostAC = (postText: string) =>
    ({type: ADD_POST, messageForNewPost: postText}) as const
export const ChangeNewTextAC = (newText: string) =>
    ({type: CHANGE_NEW_TEXT, newText: newText}) as const
export const setUserProfile = (profile: any) =>
    ({type: SET_USER_PROFILE, profile}) as const

export default profileReducer;