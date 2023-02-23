"use client";

import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { User } from '@/types';

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
type AuthContextType = {
    profile: User | null;
    setToken: (token: string) => void;
    token: string | null;
    loading: boolean;
    get: <T>(query: string, signal?: AbortSignal) => Promise<T>;
}

const AuthContext = React.createContext({} as AuthContextType);

export const useAuth = () => React.useContext(AuthContext);

export default function AuthProvider({
    children
}: {
    children: ReactNode;
}) {
    const [token, setToken] = useState<string | null>(null);
    const [profile, setProfile] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Checking if there is a token in localStorage
    useEffect(() => {
        // Checking if token is stored
        const token = localStorage.getItem('token');
        if(!token) return setLoading(false);
        setToken(token);
    }, []);

    // On token change, fetch profile
    useEffect(() => {
        if(!token) return;

        setLoading(true);
        setProfile(null);

        // Fetching user data
        fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/@me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(user => {
                setProfile(user);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [token]);

    // Function to make http request
    const makeRequest = useCallback(async function<T>(query: string, method: RequestMethod, body?: Object, signal?: AbortSignal) {
        // If body is provided, create a form data
        const formData = new FormData();
        Object.entries(body || {}).forEach(([key, value]) => {
            if(Array.isArray(value)) {
                if(value[0] instanceof File) {
                    value.forEach(v => formData.append(key, v));
                } else {
                    formData.append(key, JSON.stringify(value));
                }
                return;
            }
            formData.append(key, value);
        })

        // Creating request
        return fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}${query}`, {
            method,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: method !== 'GET' ? formData : undefined,
            signal
        })
        .then(async data => {
            // Fetch failed for other reason
            if(!data.ok) {
                const error: any = new Error(await data.text());
                error.code = data.status;

                throw error as {
                    message: string;
                    code: number;
                }
            }

            // Request is successful
            return await data.json() as T;
        })
    }, [token]);

    // Function to fetch data from API with user authentication.
    const get = useCallback(async function<T>(query: string, signal?: AbortSignal) {
        return makeRequest<T>(query, 'GET', {}, signal);
    }, [token]);

    const value = {
        profile,
        setToken,
        get,
        token,
        loading,
    }
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}