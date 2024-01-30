import {AxiosResponse} from 'axios';
import {instance, ResponseType} from './api';

export const authAPI = {
    me() {
        return instance.get<any, AxiosResponse<ResponseType<AuthMeDataType>>>(`auth/me`).then(response => response.data)
    },

    login(loginPayload: LoginPayloadType) {
        return instance.post<any, AxiosResponse<ResponseType<{ userId: number }>>, LoginPayloadType>(`auth/login`, loginPayload).then(response => response.data)
    },

    logout() {
        return instance.delete<any, AxiosResponse<ResponseType>>(`auth/login`).then(response => response.data)
    },
}

export type AuthMeDataType = {
    email: string
    id: number
    login: string
}

export type LoginPayloadType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}