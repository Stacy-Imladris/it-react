import {AxiosResponse} from 'axios';
import {instance} from './api';

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return instance.get<any, AxiosResponse<GetUsersResponseType>>(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
    },
}

export type UserPhotos = {
    small: string | null
    large: string | null
}
export type UserType = {
    name: string
    id: number
    uniqueUrlName: string | null
    photos: UserPhotos
    status: string | null
    followed: boolean
}
export type GetUsersResponseType = {
    error: null | string
    items: UserType[]
    totalCount: number
}