import {AxiosResponse} from 'axios';
import {instance} from './api';
import {FilterType} from 'redux/users-reducer';

export const usersAPI = {
    getUsers(currentPage: number = 1,
             pageSize: number = 10,
             filter: FilterType = {term: '', friend: null}) {
        return instance.get<any, AxiosResponse<GetUsersResponseType>>(
            `users?page=${currentPage}&count=${pageSize}${filter.term ? `&term=${filter.term}` : ''}${filter.friend ? `&friend=${filter.friend}` : ''}`)
            .then(response => response.data)
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
