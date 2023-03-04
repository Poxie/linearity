"use client";

import styles from '@/app/login/page.module.scss';
import { GoogleIcon } from '@/assets/icons/GoogleIcon';
import { PasswordIcon } from "@/assets/icons/PasswordIcon";
import { UserIcon } from "@/assets/icons/UserIcon";
import { useAuth } from "@/contexts/auth";
import { useAppDispatch } from '@/redux/store';
import { setToken } from '@/redux/user/actions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useRef, useState } from "react";
import Button from "../button";
import { Input } from "../input";

export default function Login() {
    const { push } = useRouter();
    const dispatch = useAppDispatch();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const login = async (e?: FormEvent) => {
        e?.preventDefault();

        // Fetching and checking if username and password have values
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        if(!username || !password) return;

        // Creating request data
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        // Checking if username and password match
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/login`, {
            method: 'POST',
            body: formData
        });

        // If error occurs, display error to user
        if(!res.ok) {
            setLoading(false);
            if([409, 404].includes(res.status)) {
                return setError(await res.text());
            }
            return setError('Something went wrong.');
        }

        // Getting and updating user token
        const { token } = await res.json();
        
        localStorage.token = token;
        dispatch(setToken(token));

        // Redirecting user to app
        push('/teams');
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
                    containerClassName={styles['input']}
                />
                <Input 
                    name={'password'}
                    placeholder={'Password'}
                    icon={<PasswordIcon />}
                    type={'password'}
                    onSubmit={() => login()}
                    containerClassName={styles['input']} 
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
                    <Link href={'/register'}>
                        Don't have an account? Create one here.
                    </Link>
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