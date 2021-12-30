import { Injectable } from '@nestjs/common';

import axios, { AxiosRequestConfig } from 'axios';

@Injectable()
export class AxiosFactory {
    create(axiosRequestConfig: AxiosRequestConfig) {
        return axios.create({
            ...axiosRequestConfig
        });
    }
}
