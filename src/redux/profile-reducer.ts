import {ActionsTypes} from "./store";

const ADD_POST = 'ADD-POST'
const CHANGE_NEW_TEXT = 'CHANGE-NEW-TEXT'

export type PostType = {
    id: number
    message: string
    likesCount: number
}

const initialState = {
    messageForNewPost: '',
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 3},
        {id: 2, message: 'It\'s my first post', likesCount: 23},
        {id: 3, message: 'Blabla', likesCount: 17},
        {id: 4, message: 'Dadada', likesCount: 99},
    ] as Array<PostType>,
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
        case CHANGE_NEW_TEXT: {
            return {...state, messageForNewPost: action.newText}
        }
        default:
            return state;
    }
}

export const addPostAC = (postText: string) =>
    ({type: ADD_POST, messageForNewPost: postText}) as const
export const ChangeNewTextAC = (newText: string) =>
    ({type: CHANGE_NEW_TEXT, newText: newText}) as const

export default profileReducer;