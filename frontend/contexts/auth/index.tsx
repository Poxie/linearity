"use client";

import React, { ReactNode, useEffect, useState } from 'react';
import { User } from '@/types';

const AuthContext = React.createContext({} as {
    profile: User | null;
    setToken: (token: string) => void;
    loading: boolean;
});

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

    const value = {
        profile,
        setToken,
        loading
    }
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}