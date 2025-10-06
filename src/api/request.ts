// src/services/http-client.ts
import axios, {type AxiosInstance, type AxiosRequestConfig, type AxiosResponse} from 'axios';

class HttpClient {
    private client: AxiosInstance;

    constructor(baseURL: string) {
        this.client = axios.create({
            baseURL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Request interceptor
        this.client.interceptors.request.use(
            (config) => {
                // You can add authentication tokens here if needed
                // config.headers.Authorization = `Bearer ${token}`;
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Response interceptor
        this.client.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                // Handle common errors
                if (error.response?.status === 401) {
                    // Handle unauthorized access
                }
                return Promise.reject(error);
            }
        );
    }

    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.client.get<T>(url, config);
    }

    public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.client.post<T>(url, data, config);
    }
}

// Create and export the HTTP client instance
export const httpClient = new HttpClient('http://localhost:8080/voting/poll');
