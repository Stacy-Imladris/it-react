import axios from 'axios';
import {ResultCodes} from 'enums/resultCodes';

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'c2512ed0-ae10-41e2-9947-2f9cd9cdb666'
    },
})

export type ResponseType<T = {}> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: ResultCodes
}