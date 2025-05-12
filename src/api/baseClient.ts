import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { buildParams } from './helpers';

const API_URL = import.meta.env.VITE_BASE_URI;

export class HTTPError extends Error {
    constructor(public status: number, public cause: string) {
        super(cause);
    }
}

export class BaseClient {
    private baseUrl = API_URL;
    private axios: AxiosInstance;
    private static instance: BaseClient | null = null;

    private constructor() {
        this.axios = Axios.create({
            baseURL: this.baseUrl,
        });
    }

    public static getInstance(): BaseClient {
        if (!BaseClient.instance) {
            BaseClient.instance = new BaseClient();
        }
        return BaseClient.instance;
    }

    get = async <T, K>(
        url: string,
        params?: K,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> => {
        const queryParams = params ? buildParams(params) : '';
        return this.axios.get(url + queryParams, config);
    };

    post = async <T, K>(
        url: string,
        data?: K,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> => {
        return this.axios.post(url, data, config);
    };

    put = async <T, K>(
        url: string,
        data?: K,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> => {
        return this.axios.put(url, data, config);
    };

    patch = async <T, K>(
        url: string,
        data?: K,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> => {
        return this.axios.patch(url, data, config);
    };

    delete = async <T, K>(url: string, data?: K): Promise<AxiosResponse<T>> => {
        return this.axios.delete(url, { params: data });
    };
}

export const baseApiClient = BaseClient.getInstance();
