import {AxiosResponse} from 'axios'
import {instance, ResponseType} from './api'

export const followAPI = {
    unfollowUser(id: number) {
        return instance.delete<any, AxiosResponse<ResponseType>>(`follow/${id}`).then(res => res.data)
    },
    followUser(id: number) {
        return instance.post<any, AxiosResponse<ResponseType>>(`follow/${id}`).then(res => res.data)
    },
}
