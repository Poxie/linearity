"use client";

import styles from '@/app/login/page.module.scss';
import { GoogleIcon } from '@/assets/icons/GoogleIcon';
import { PasswordIcon } from "@/assets/icons/PasswordIcon";
import { UserIcon } from "@/assets/icons/UserIcon";
import { useAuth } from "@/contexts/auth";
import { FormEvent, useRef, useState } from "react";
import Button from "../button";
import { Input } from "../input";

export default function Login() {
    const { setToken } = useAuth();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const login = async (e?: FormEvent) => {
        e?.preventDefault();

        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        if(!username || !password) return;

        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/login`, {
            method: 'POST',
            body: formData
        });

        if(!res.ok) {
            setLoading(false);
            if([409, 404].includes(res.status)) {
                return setError(await res.text());
            }
            return setError('Something went wrong.');
        }

        const { token } = await res.json();
        
        localStorage.token = token;
        setToken(token);
    }

    return(
        <main className={styles.container}>
            <h1>
                Sign into {process.env.NEXT_PUBLIC_WEBSITE_NAME}
            </h1>
            <form onSubmit={login}>
                <Input 
                    name={'username'}
                    placeholder={'Username'}
                    icon={<UserIcon />}
                    ref={usernameRef}
                />
                <Input 
                    name={'password'}
                    placeholder={'Password'}
                    icon={<PasswordIcon />}
                    type={'password'}
                    onSubmit={() => login()}
                    ref={passwordRef}
                />
                <Button buttonType={'submit'} disabled={loading}>
                    {loading ? 'Logging in...' : 'Sign in'}
                </Button>

                {error && (
                    <span>
                        {error}
                    </span>
                )}

                <div className={styles['form-options']}>
                    <button type="button">
                        Forgot your password?
                    </button>
                    <button type="button">
                        Don't have an account? Create one here.
                    </button>
                </div>
            </form>
            <span className={styles.divider}>
                OR
            </span>
            <Button type={'hollow'} disabled={loading}>
                <GoogleIcon />
                Continue with Google
            </Button>
        </main>
    )
}