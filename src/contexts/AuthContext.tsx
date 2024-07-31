import { createContext, ReactNode, useState, useEffect, useContext  } from "react";

import { api } from '../services/apiClient';

import { destroyCookie, setCookie, parseCookies } from 'nookies';
import Router from "next/router";

import { toast } from "react-toastify";

type AuthContextData = {
    user: UserProps | undefined;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
    signUp: (credentials: SignUpProps) => Promise<void>;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps = {
    email: string;
    password: string;
}

type SignUpProps = {
    email: string;
    name: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
    try {
        destroyCookie(undefined, '@nextauth.token')
        Router.push('/')
    } catch {
        console.log('erro ao deslogar')
    }
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps | undefined>(undefined);
    const isAuthenticated = !!user;

    useEffect(() => {
        // cookie
        const { '@nextauth.token': token } = parseCookies();

        if(token) {
            api.get('/me').then(response => {
                const { id, email, name } = response.data;

                setUser({
                    id,
                    email,
                    name
                })
            })
            .catch(() => {
                signOut();
            })
        }

    }, [])

    async function signIn({ email, password }: SignInProps) {
        try {
            const response = await api.post('/session', {
                email,
                password
            });
    
            const { id, name, access_token
            } = response.data;
    
            setCookie(undefined, '@nextauth.token', access_token, {
                maxAge: 60 * 60 * 24 * 30, // expira em 1 mês
                path: "/" // quais caminhos terão acesso ao cookie
            });
    
            setUser({
                id,
                name,
                email,
            });
    
            api.defaults.headers['Authorization'] = `Bearer ${access_token}`;
    
            toast.success('Sucesso ao Logar!');
    
            Router.push('/taskManager');
    
        } catch (err) {
            toast.error('Erro ao acessar');
            console.log("Access error", err);
        }
    }

    async function signUp({ email, name, password }: SignUpProps) {
        try {
            const response = await api.post('/users', {
                email,
                name,
                password
            });
    
            toast.success('Cadastro criado com sucesso!');
            Router.push('/');
        } catch (err: any) {
            if (err.response?.status === 409) {
                toast.error('Email já está em uso');
            } else {
                toast.error('Erro ao cadastrar usuário.');
            }
            console.log('Error when registering user', err);
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}