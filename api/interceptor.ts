import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse, CancelToken } from 'axios';

import { ROUTE_CONSTANTS, STORAGE_CONSTANTS } from 'utils/constants';

import { loadState } from 'utils/localStorage';

import Router from 'next/router';

export const BASE_URL = 'http://localhost:3001/api/v1/';
// 'http://13.202.63.227:3001/';
// 'https://dodoclub.in';
// http://localhost:3000

const Request = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

const serializeError = (error: AxiosError): any => {
    const { response } = error;
    if (!response) throw error;
    const { status, statusText, data } = response;
    // const { message } = data;
    let errorMsg = '';
    // try {
    //     errorMsg = JSON.parse(message).error.debug_msg;
    // } catch (e) {
    //     errorMsg = message;
    // }
    const errorObj = {
        name: 'API ERROR',
        message: errorMsg || statusText || `API FAILED (${status})`,
        code: status.toString(),
        stack: JSON.stringify(error.toJSON()),
    };
    return errorObj;
};

const tokenAndAppInfoHeaderInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = loadState(STORAGE_CONSTANTS.TOKEN_SESSION_KEY);
    if (!token) return config;
    if (!config?.headers) {
        throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
    }
    config.headers['Authorization'] = `Bearer ${token}`;
    config.headers['token'] = token;
    return config;
};

const onErrorInterceptor = (error: AxiosError): any => {
    const Error = serializeError(error);
    console.log('------API ERROR-----', Error);

    console.log('sacsdv', error)
    const status = error?.response?.status;

    if (status === 401 || status === 403) {
        // localStorage.clear();

        return;
    }

    throw Error;
};

Request.interceptors.request.use(tokenAndAppInfoHeaderInterceptor);

interface IAPIResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

const extractor = <T>(response: AxiosResponse<IAPIResponse<T>>) => {
    const { status, data, statusText } = response;

    if (status !== 200 && status !== 201) throw new Error(statusText);

    return data;
};

interface IGetParams {
    [field: string]: string | number;
}

export const Get = <T>(path: string, params?: Partial<IGetParams>, cancelToken?: CancelToken): Promise<T> =>
    Request.get<IAPIResponse<T>>(path, { params, cancelToken }).then(extractor).catch(onErrorInterceptor);

export const Post = <T>(path: string, payload: unknown, headers?: any, cancelToken?: CancelToken): Promise<T> =>
    Request.post<IAPIResponse<T>>(path, payload, { cancelToken, headers }).then(extractor).catch(onErrorInterceptor);

export const Put = <T>(path: string, payload: unknown, cancelToken?: CancelToken): Promise<T> =>
    Request.put<IAPIResponse<T>>(path, payload, { cancelToken }).then(extractor).catch(onErrorInterceptor);
