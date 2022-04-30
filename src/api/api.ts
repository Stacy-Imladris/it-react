import axios, {AxiosResponse} from 'axios';
import {ProfileDataFormPropsType} from '../components/Profile/ProfileInfo/ProfileDataForm/ProfileDataForm';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'd15adb53-e1a9-448b-a340-637470374c93'
    },
})

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<any, AxiosResponse<ProfileType>>(`profile/${userId}`).then(response => response.data)
    },
    getStatus(userId: number) {
        return instance.get<any, AxiosResponse<string>>(`profile/status/${userId}`).then(response => response.data)
    },
    updateStatus(status: string) {
        return instance.put<any, AxiosResponse<ResponseType>, { status: string }>(`profile/status`, {status}).then(response => response.data)
    },
    savePhoto(file: string | Blob) {
        const formData = new FormData()
        formData.append('image', file)
        return instance.put<any, AxiosResponse<ResponseType<{photos: UserPhotos}>>, FormData>(`profile/photo`, formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        }).then(response => response.data)
    },
    saveProfile(profile: ProfileDataFormPropsType) {
        return instance.put<any, AxiosResponse<ResponseType>, ProfileDataFormPropsType>(`profile`, profile).then(response => response.data)
    }
}

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return instance.get<any, AxiosResponse<GetUsersResponseType>>(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
    },
}

export const followAPI = {
    unfollowUser(id: number) {
        return instance.delete<any, AxiosResponse<ResponseType>>(`follow/${id}`).then(response => response.data)
    },
    followUser(id: number) {
        return instance.post<any, AxiosResponse<ResponseType>>(`follow/${id}`).then(response => response.data)
    },
}

export const authAPI = {
    me() {
        return instance.get<any, AxiosResponse<ResponseType<{ email: string, id: number, login: string }>>>(`auth/me`).then(response => response.data)
    },
    login(email: string, password: string, rememberMe: boolean = false) {
        return instance.post<any, AxiosResponse<ResponseType<{ userId: number }>>, { email: string, password: string, rememberMe: boolean }>(`auth/login`, {email, password, rememberMe}).then(response => response.data)
    },
    logout() {
        return instance.delete<any, AxiosResponse<ResponseType>>(`auth/login`).then(response => response.data)
    },
}

export type ResponseType<T = {}> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}
export type ContactType = {
    facebook: null | string
    github: null | string
    instagram: null | string
    mainLink: null | string
    twitter: null | string
    vk: null | string
    website: null | string
    youtube: null | string
}
export type ProfileType = {
    aboutMe?: string
    contacts?: ContactType
    lookingForAJob?: boolean
    lookingForAJobDescription?: string
    fullName?: string
    userId?: number
    photos: UserPhotos
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