import axios from 'axios';
import {ResultCodes} from '../enums/resultCodes';

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'd15adb53-e1a9-448b-a340-637470374c93'
    },
})

export type ResponseType<T = {}> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: ResultCodes
}