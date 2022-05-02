import {AxiosResponse} from 'axios';
import {instance} from './api';

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<any, AxiosResponse<SecurityResponseType>>(`security/get-captcha-url`).then(response => response.data.url)
    },
}

export type SecurityResponseType = {
    url: string
}