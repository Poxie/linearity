"use client";

import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { User } from '@/types';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { selectToken } from '@/redux/user/selectors';
import { setToken, setUser } from '@/redux/user/actions';

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
type AuthContextType = {
    get: <T>(query: string, signal?: AbortSignal) => Promise<T>;
    post: <T>(query: string, values: Object, signal?: AbortSignal) => Promise<T>;
    put: <T>(query: string, values?: Object, signal?: AbortSignal) => Promise<T>;
    patch: <T>(query: string, values?: Object, signal?: AbortSignal) => Promise<T>;
    destroy: <T>(query: string, values?: Object, signal?: AbortSignal) => Promise<T>;
}

const AuthContext = React.createContext({} as AuthContextType);

export const useAuth = () => React.useContext(AuthContext);

export default function AuthProvider({
    children
}: {
    children: ReactNode;
}) {
    const dispatch = useAppDispatch();
    const token = useAppSelector(selectToken);

    // Checking if there is a token in localStorage
    useEffect(() => {
        // Checking if token is stored
        const token = localStorage.getItem('token');
        if(!token) {
            dispatch(setUser(null));
            return;
        }
        
        dispatch(setToken(token));
    }, []);

    // On token change, fetch profile
    useEffect(() => {
        if(!token) return;

        // Fetching user data
        fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/@me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(user => {
                dispatch(setUser(user));
            })
            .catch(() => {
                dispatch(setUser(null));
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

    // Function to post data to API with user authentication.
    const post = useCallback(async function<T>(query: string, values: Object, signal?: AbortSignal) {
        return makeRequest<T>(query, 'POST', values, signal);
    }, [token]);

    // Function to put data to API with user authentication.
    const put = useCallback(async function<T>(query: string, values?: Object, signal?: AbortSignal) {
        return makeRequest<T>(query, 'PUT', values || {}, signal);
    }, [token]);

    // Function to patch data in the API with user authentication.
    const patch = useCallback(async function<T>(query: string, values?: Object, signal?: AbortSignal) {
        return makeRequest<T>(query, 'PATCH', values || {}, signal);
    }, [token]);

    // Function to put data to API with user authentication.
    const destroy = useCallback(async function<T>(query: string, values?: Object, signal?: AbortSignal) {
        return makeRequest<T>(query, 'DELETE', values || {}, signal);
    }, [token]);

    const value = {
        get,
        put,
        post,
        patch,
        destroy
    }
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}