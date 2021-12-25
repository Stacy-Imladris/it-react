export type PostType = {
    id: number
    message: string
    likesCount: number
}
export type DialogType = {
    id: number
    name: string
}
export type MessageType = {
    id: number
    message: string
}
export type ProfilePageType = {
    posts: Array<PostType>
}
export type DialogsPageType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
}
export type SidebarType = {}
export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sidebar: SidebarType
}

let state: RootStateType = {
    profilePage: {
        posts: [
            {id: 1, message: 'Hi, how are you?', likesCount: 3},
            {id: 2, message: 'It\'s my first post', likesCount: 23},
            {id: 3, message: 'Blabla', likesCount: 17},
            {id: 4, message: 'Dadada', likesCount: 99},
        ],
    },
    dialogsPage: {
        dialogs: [
            {id: 1, name: 'Alex'},
            {id: 2, name: 'Alice'},
            {id: 3, name: 'Tanya'},
            {id: 4, name: 'Stacy'},
        ],
        messages: [
            {id: 1, message: 'Hello'},
            {id: 2, message: 'How are you?'},
            {id: 3, message: 'Ooops'},
        ],
    },
    sidebar: {}
}

export default state;