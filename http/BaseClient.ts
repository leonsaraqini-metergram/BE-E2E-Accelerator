import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getConfig } from "../util/Config";

/**
 * Base class for handling HTTP requests using Axios.
 * Configures and manages Axios instances for making API calls.
 */
class BaseClient {
    protected baseUrl: string;
    private httpRequestHeaders: Record<string, string>;
    private restInstance: AxiosInstance;

    /**
     * Creates an instance of the BaseClient.
     * Initializes the Axios instance with the base URL from the configuration.
     */
    constructor() {
        const config = getConfig();
        this.baseUrl = config.HOSTNAMEAPI;
        this.httpRequestHeaders = {};
        this.restInstance = axios.create({
            baseURL: config.HOSTNAMEAPI
        });
    }

    /**
     * Handles an Axios request with the provided configuration.
     * @param {AxiosRequestConfig} config - The Axios request configuration.
     * @returns {Promise<AxiosResponse<T> | null>} A promise that resolves with the Axios response or null if an error occurs.
     * @private
     * @template T - The type of the response data.
     */
    private async handleRequest<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T> | null> {
        try {
            return await this.restInstance.request<T>(config);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    return error.response;
                }
            }
            return null;
        }
    }

    /**
     * Makes a POST request to a specific route.
     * @param {string} route - The API route.
     * @param {any} body - The request body.
     * @returns {Promise<AxiosResponse<T> | null>} A promise that resolves with the Axios response or null if an error occurs.
     * @template T - The type of the response data.
     */
    async post<T>(route: string, body: any): Promise<AxiosResponse<T> | null> {
        const config: AxiosRequestConfig = {
            url: this.baseUrl + route,
            method: 'post',
            headers: this.httpRequestHeaders,
            data: body
        };
        return await this.handleRequest<T>(config);
    }

    /**
     * Makes a GET request to a specific route.
     * @param {string} route - The API route.
     * @returns {Promise<AxiosResponse<T> | null>} A promise that resolves with the Axios response or null if an error occurs.
     * @template T - The type of the response data.
     */
    async get<T>(route: string): Promise<AxiosResponse<T> | null> {
        const config: AxiosRequestConfig = {
            url: this.baseUrl + route,
            method: 'get',
            headers: this.httpRequestHeaders
        };
        return await this.handleRequest<T>(config);
    }


    /**
     * Adds a custom header to be used in HTTP requests.
     * @param {string} key - The header name.
     * @param {string} value - The header value.
     */
    addHeader(key: string, value: string): void {
        this.httpRequestHeaders[key] = value;
    }
}

export default BaseClient;