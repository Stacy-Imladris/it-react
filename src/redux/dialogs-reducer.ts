const ADD_MESSAGE = 'ADD_MESSAGE'
const CHANGE_NEW_MESSAGE_TEXT = 'CHANGE_NEW_MESSAGE_TEXT'

export type DialogType = {
    id: number
    name: string
    img: string
}
export type MessageType = {
    id: number
    message: string
}
const initialState = {
    messageForNewMessage: '',
    dialogs: [
        {
            id: 1,
            name: 'Alex',
            img: 'data:image/jpeg;base64,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'
        },
        {
            id: 2,
            name: 'Alice',
            img: 'https://w7.pngwing.com/pngs/697/617/png-transparent-my-little-pony-equestria-girls-rarity-twilight-sparkle-rarity-mlp-horse-purple-mammal.png'
        },
        {
            id: 3,
            name: 'Tanya',
            img: 'https://ae01.alicdn.com/kf/HTB1TiyBQIfpK1RjSZFOq6y6nFXa0/HOMFUN-%D0%BF%D0%BE%D0%BB%D0%BD%D1%8B%D0%B9-%D0%BA%D0%B2%D0%B0%D0%B4%D1%80%D0%B0%D1%82%D0%BD%D1%8B%D0%B9-%D0%BA%D1%80%D1%83%D0%B3%D0%BB%D1%8B%D0%B9-%D0%B4%D1%80%D0%B5%D0%BB%D1%8C-5D-DIY-%D0%90%D0%BB%D0%BC%D0%B0%D0%B7%D0%BD%D0%B0%D1%8F-%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%B0-%D0%91%D0%B0%D0%B1%D0%BE%D1%87%D0%BA%D0%B0-%D0%A4%D0%B5%D1%8F-3D-%D0%90%D0%BB%D0%BC%D0%B0%D0%B7%D0%BD%D0%B0%D1%8F-%D0%92%D1%8B%D1%88%D0%B8%D0%B2%D0%BA%D0%B0-%D0%BA%D1%80%D0%B5%D1%81%D1%82%D0%BE%D0%BC-%D0%B4%D0%BE%D0%BC%D0%B0%D1%88%D0%BD%D0%B8%D0%B9.jpg_640x640.jpg'
        },
        {
            id: 4,
            name: 'Stacy',
            img: 'https://icons.iconarchive.com/icons/3xhumed/mega-games-pack-24/256/The-Elder-Scrolls-IV-Oblivion-1-icon.png'
        },
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: 'Hello'},
        {id: 2, message: 'How are you?'},
        {id: 3, message: 'Ooops'},
    ] as Array<MessageType>,
}

export type ActionTypes = ReturnType<typeof addMessage> | ReturnType<typeof changeNewMessageText>

export type InitialStateType = typeof initialState

const dialogsReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case ADD_MESSAGE:
            const newMessage: MessageType = {
                id: new Date().getTime(),
                message: action.messageForNewMessage,
            }
            return {...state,
                messageForNewMessage: '',
                messages: [...state.messages, newMessage]
            }
        case CHANGE_NEW_MESSAGE_TEXT:
            return {...state, messageForNewMessage: action.newTextMessage}
        default:
            return state;
    }
}

export const addMessage = (messageText: string) =>
    ({type: ADD_MESSAGE, messageForNewMessage: messageText}) as const
export const changeNewMessageText = (newMessage: string) =>
    ({type: CHANGE_NEW_MESSAGE_TEXT, newTextMessage: newMessage}) as const

export default dialogsReducer;