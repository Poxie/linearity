"use client";

import { PasswordIcon } from '@/assets/icons/PasswordIcon';
import { UserIcon } from '@/assets/icons/UserIcon';
import { useAuth } from '@/contexts/auth';
import { useAppDispatch } from '@/redux/store';
import { setToken } from '@/redux/user/actions';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import styles from '../../app/login/page.module.scss';
import Button from '../button';
import { Input } from '../input';

export const Register = () => {
    const { push } = useRouter();
    const dispatch = useAppDispatch();

    const [error, setError] = useState<null | string>(null);
    const [loading, setLoading] = useState(false);

    const nameRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const repeatPasswordRef = useRef<HTMLInputElement>(null);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const name = nameRef.current?.value;
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        const repeatPassword = repeatPasswordRef.current?.value;
        
        if(!name || !username || !password) return;
        if(password !== repeatPassword) return setError('Passwords don\'t match')

        const formData = new FormData();
        formData.append('name', name);
        formData.append('username', username);
        formData.append('password', password);

        setLoading(true);
        fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/users`, {
            method: 'POST',
            body: formData
        }).then(async res => {
            if(!res.ok) throw new Error(res.status === 500 ? 'Internal error' : await res.text());
            return await res.json();
        }).then(({ token }: { token: string }) => {
            window.localStorage.setItem('token', token);
            dispatch(setToken(token));
            push(`/teams`);
        })
        .catch((error: Error) => {
            setError(error.message);
            setLoading(false);
        })
    }

    return(
        <div className={styles['container']}>
            <h1>
                Create Account
            </h1>
            
            <form onSubmit={onSubmit}>
                <Input 
                    placeholder={'Full name'}
                    icon={<UserIcon />}
                    containerClassName={styles['input']}
                    name={'name'}
                    ref={nameRef}
                />
                <Input 
                    placeholder={'Username'}
                    icon={<UserIcon />}
                    containerClassName={styles['input']}
                    name={'username'}
                    ref={usernameRef}
                />
                <Input 
                    placeholder={'Password'}
                    icon={<PasswordIcon />}
                    containerClassName={styles['input']}
                    name={'password'}
                    type={'password'}
                    ref={passwordRef}
                />
                <Input 
                    placeholder={'Repeat password'}
                    icon={<PasswordIcon />}
                    containerClassName={styles['input']}
                    name={'repeat-password'}
                    type={'password'}
                    ref={repeatPasswordRef}
                />
                <Button 
                    buttonType={'submit'}
                    disabled={loading}
                >
                    {loading ? 'Creating account...' : 'Create account'}
                </Button>
            </form>
            {error}
        </div>
    )
}