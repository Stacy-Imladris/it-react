import {renderTree} from "../render";

export type PostType = {
    id: number
    message: string
    likesCount: number
}
export type DialogType = {
    id: number
    name: string
    img: string
}
export type MessageType = {
    id: number
    message: string
}
export type FriendType = {
    id: number
    name: string
    img: string
}
export type ProfilePageType = {
    messageForNewPost: string
    posts: Array<PostType>
}
export type DialogsPageType = {
    messageForNewMessage: string
    dialogs: Array<DialogType>
    messages: Array<MessageType>
}
export type SidebarType = {
    friends: Array<FriendType>
}
export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sidebar: SidebarType
}

let state: RootStateType = {
    profilePage: {
        messageForNewPost: '',
        posts: [
            {id: 1, message: 'Hi, how are you?', likesCount: 3},
            {id: 2, message: 'It\'s my first post', likesCount: 23},
            {id: 3, message: 'Blabla', likesCount: 17},
            {id: 4, message: 'Dadada', likesCount: 99},
        ],
    },
    dialogsPage: {
        messageForNewMessage: '',
        dialogs: [
            {id: 1, name: 'Alex', img:'https://lh3.googleusercontent.com/proxy/RW4gQakgb3QH2a7nx-tIx5bsk6-t2EeVDe2geT34JvPGeADsWQwLKTSqJxp9ZY0gCpzTDvJd3mtn_pf1VHNrh7K_3Imnz7yE-y4L7mGk8ehmNAEYh_N7WbvZ_g'},
            {id: 2, name: 'Alice', img:'https://w7.pngwing.com/pngs/697/617/png-transparent-my-little-pony-equestria-girls-rarity-twilight-sparkle-rarity-mlp-horse-purple-mammal.png'},
            {id: 3, name: 'Tanya', img:'https://ae01.alicdn.com/kf/HTB1TiyBQIfpK1RjSZFOq6y6nFXa0/HOMFUN-%D0%BF%D0%BE%D0%BB%D0%BD%D1%8B%D0%B9-%D0%BA%D0%B2%D0%B0%D0%B4%D1%80%D0%B0%D1%82%D0%BD%D1%8B%D0%B9-%D0%BA%D1%80%D1%83%D0%B3%D0%BB%D1%8B%D0%B9-%D0%B4%D1%80%D0%B5%D0%BB%D1%8C-5D-DIY-%D0%90%D0%BB%D0%BC%D0%B0%D0%B7%D0%BD%D0%B0%D1%8F-%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%B0-%D0%91%D0%B0%D0%B1%D0%BE%D1%87%D0%BA%D0%B0-%D0%A4%D0%B5%D1%8F-3D-%D0%90%D0%BB%D0%BC%D0%B0%D0%B7%D0%BD%D0%B0%D1%8F-%D0%92%D1%8B%D1%88%D0%B8%D0%B2%D0%BA%D0%B0-%D0%BA%D1%80%D0%B5%D1%81%D1%82%D0%BE%D0%BC-%D0%B4%D0%BE%D0%BC%D0%B0%D1%88%D0%BD%D0%B8%D0%B9.jpg_640x640.jpg'},
            {id: 4, name: 'Stacy', img:'https://icons.iconarchive.com/icons/3xhumed/mega-games-pack-24/256/The-Elder-Scrolls-IV-Oblivion-1-icon.png'},
        ],
        messages: [
            {id: 1, message: 'Hello'},
            {id: 2, message: 'How are you?'},
            {id: 3, message: 'Ooops'},
        ],
    },
    sidebar: {
        friends: [
            {id: 1, name: 'Alex', img:'https://lh3.googleusercontent.com/proxy/RW4gQakgb3QH2a7nx-tIx5bsk6-t2EeVDe2geT34JvPGeADsWQwLKTSqJxp9ZY0gCpzTDvJd3mtn_pf1VHNrh7K_3Imnz7yE-y4L7mGk8ehmNAEYh_N7WbvZ_g'},
            {id: 2, name: 'Alice', img:'https://w7.pngwing.com/pngs/697/617/png-transparent-my-little-pony-equestria-girls-rarity-twilight-sparkle-rarity-mlp-horse-purple-mammal.png'},
            {id: 3, name: 'Tanya', img:'https://ae01.alicdn.com/kf/HTB1TiyBQIfpK1RjSZFOq6y6nFXa0/HOMFUN-%D0%BF%D0%BE%D0%BB%D0%BD%D1%8B%D0%B9-%D0%BA%D0%B2%D0%B0%D0%B4%D1%80%D0%B0%D1%82%D0%BD%D1%8B%D0%B9-%D0%BA%D1%80%D1%83%D0%B3%D0%BB%D1%8B%D0%B9-%D0%B4%D1%80%D0%B5%D0%BB%D1%8C-5D-DIY-%D0%90%D0%BB%D0%BC%D0%B0%D0%B7%D0%BD%D0%B0%D1%8F-%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%B0-%D0%91%D0%B0%D0%B1%D0%BE%D1%87%D0%BA%D0%B0-%D0%A4%D0%B5%D1%8F-3D-%D0%90%D0%BB%D0%BC%D0%B0%D0%B7%D0%BD%D0%B0%D1%8F-%D0%92%D1%8B%D1%88%D0%B8%D0%B2%D0%BA%D0%B0-%D0%BA%D1%80%D0%B5%D1%81%D1%82%D0%BE%D0%BC-%D0%B4%D0%BE%D0%BC%D0%B0%D1%88%D0%BD%D0%B8%D0%B9.jpg_640x640.jpg'},
        ]
    }
}

export const addPost = (messageForNewPost: string) => {
    const newPost: PostType = {
        id: new Date().getTime(),
        message: messageForNewPost,
        likesCount: 0,
    }
    state.profilePage.posts.push(newPost)
    state.profilePage.messageForNewPost = ''
    renderTree(state)
}

export const changeNewText = (newText: string) => {
    state.profilePage.messageForNewPost = newText
    renderTree(state)
}

export const addMessage = (messageForNewMessage: string) => {
    const newMessage: PostType = {
        id: new Date().getTime(),
        message: messageForNewMessage,
        likesCount: 0,
    }
    state.dialogsPage.messages.push(newMessage)
    state.dialogsPage.messageForNewMessage = ''
    renderTree(state)
}

export const changeNewMessageText = (newTextMessage: string) => {
    state.dialogsPage.messageForNewMessage = newTextMessage
    renderTree(state)
}

export default state;