"use client";

import React, { ReactNode, useEffect, useState } from 'react';
import { User } from '@/types';

const AuthContext = React.createContext({} as {
    profile: User | null;
    setProfile: (user: User) => void;
});

export default function AuthProvider({
    children
}: {
    children: ReactNode;
}) {
    const [profile, setProfile] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Checking if user access token is stored on mount
    // If so, fetch for user information
    useEffect(() => {
        // Checking if token is stored
        const token = localStorage.getItem('token');
        if(!token) return setLoading(false);

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
    }, []);

    const value = {
        profile,
        setProfile,
        loading
    }
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}