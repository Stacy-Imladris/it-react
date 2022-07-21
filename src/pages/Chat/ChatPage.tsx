import {FC, useEffect, useState} from 'react';

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

const ChatPage: FC = () => {
    return <div>
        <Chat/>
    </div>
}

export const Chat: FC = () => {
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)

    useEffect(() => {
        let ws: WebSocket
        const closeHandle = () => {
            setTimeout(createChannel, 1000)
        }

        function createChannel() {
            ws?.removeEventListener('close', closeHandle)
            ws?.close()
            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            ws?.addEventListener('close', closeHandle)
            setWsChannel(ws)
        }

        createChannel()
        return () => {
            ws.removeEventListener('close', closeHandle)
            ws.close()
        }
    }, [])

    return <div>
        <Messages wsChannel={wsChannel}/>
        <AddMessageForm wsChannel={wsChannel}/>
    </div>
}

export const Messages: FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        const messageHandle = (e: MessageEvent) => {
            setMessages(prevMessages => [...prevMessages, ...JSON.parse(e.data)])
        }
        wsChannel?.addEventListener('message', messageHandle)
        return () => {
            wsChannel?.removeEventListener('message', messageHandle)
        }
    }, [wsChannel])

    return <div style={{height: '480px', overflowY: 'auto'}}>
        {messages.map((m, index) => <Message key={index} message={m}/>)}
    </div>
}

type MessagePropsType = {
    message: ChatMessageType
}

export const Message: FC<MessagePropsType> = ({message}) => {
    return <div>
        <img src={message.photo} alt={'avatar'}
             style={{width: '30px', borderRadius: '50%'}}/><b>{message.userName}</b>
        <br/>
        {message.message}
        <hr/>
    </div>
}

export const AddMessageForm: FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {
    const [message, setMessage] = useState<string>('')
    const [isReady, setIsReady] = useState<'pending' | 'ready'>('pending')

    useEffect(() => {
        const openHandle = () => {
            setIsReady('ready')
        };
        wsChannel?.addEventListener('open', openHandle)
        return () => {
            wsChannel?.removeEventListener('open', openHandle)
        }
    }, [])

    const sendMessage = () => {
        if (!message) return
        wsChannel?.send(message)
        setMessage('')
    }

    return <div>
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)}
                      value={message}/>
        </div>
        <div>
            <button onClick={sendMessage}
                    disabled={wsChannel === null || isReady !== 'ready'}>Send
            </button>
        </div>
    </div>
}

export default ChatPage