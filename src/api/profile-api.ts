import {AxiosResponse} from 'axios';
import {ProfileDataFormPropsType} from '../components/Profile/ProfileInfo/ProfileDataForm/ProfileDataForm';
import {UserPhotos} from './users-api';
import {instance, ResponseType} from './api';

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<any, AxiosResponse<ProfileType>>(`profile/${userId}`).then(response => response.data)
    },
    getStatus(userId: number) {
        return instance.get<any, AxiosResponse<string>>(`profile/status/${userId}`).then(response => response.data)
    },
    updateStatus(status: string) {
        return instance.put<any, AxiosResponse<ResponseType>, UpdateStatusPayloadType>(`profile/status`, {status}).then(response => response.data)
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
export type UpdateStatusPayloadType = {
    status: string
}