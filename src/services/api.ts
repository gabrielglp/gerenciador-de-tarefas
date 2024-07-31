import axios, { AxiosError } from 'axios';
import { parseCookies } from 'nookies';
import { AuthTokenError } from './errors/AuthTokenError';
import { signOut } from '../contexts/AuthContext';

export function setupAPIClient(ctx = undefined) {
    const api = axios.create({
        baseURL: 'http://localhost:3000',
    });
    api.interceptors.request.use((config) => {
        const cookies = parseCookies(ctx);
        const token = cookies['@nextauth.token'];

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    api.interceptors.response.use(response => {
        return response;
    }, (error: AxiosError) => {
        if (error.response?.status === 401) {
            if (typeof window !== 'undefined') {
                // Chamando a função para deslogar o usuário.
                signOut();
            } else {
                return Promise.reject(new AuthTokenError());
            }
        }
        
        return Promise.reject(error);
    });

    return api;
}