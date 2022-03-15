import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'd15adb53-e1a9-448b-a340-637470374c93'
    },
})

export const profileAPI = {
    getProfile(userId: number){
        return instance.get(`profile/${userId}`).then(response => response.data)
    },
    getStatus(userId: number){
        return instance.get(`profile/status/${userId}`).then(response => response.data)
    },
    updateStatus(status: string){
        return instance.put(`profile/status`, {status}).then(response => response.data)
    },
}

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10){
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
    },
}

export const followAPI = {
    unfollowUser(id: number){
        return instance.delete(`follow/${id}`).then(response => response.data)
    },
    followUser(id: number){
        return instance.post(`follow/${id}`).then(response => response.data)
    },
}

export const authAPI = {
    me(){
        return instance.get(`auth/me`).then(response => response.data)
    },
    login(email: string, password: string, rememberMe: boolean = false){
        return instance.post(`auth/login`, {email, password, rememberMe}).then(response => response.data)
    },
    logout(){
        return instance.delete(`auth/login`).then(response => response.data)
    },
}
