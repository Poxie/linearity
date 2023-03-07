"use client";

import { useAppSelector } from '@/redux/store';
import { selectUser, selectUserLoading } from '@/redux/user/selectors';
import { useRouter } from 'next/navigation';
import Button from '../button';
import styles from './Account.module.scss';

export const AccountHeader = () => {
    const { replace } = useRouter();
    const user = useAppSelector(selectUser);
    const loading = useAppSelector(selectUserLoading);

    if(loading) return null
    if(!user) {
        replace(`/login`);
        return null;
    }
    
    return(
        <div className={styles['header']}>
            <div className={styles['header-icon']}>
                {user.name[0].toUpperCase()}
            </div>
            <div className={styles['header-text']}>
                <div className={styles['header-text-main']}>
                    <span className={styles['header-name']}>
                        {user.name}
                    </span>
                    <Button 
                        className={styles['header-button']}
                        href={'/settings/profiles'}
                    >
                        Edit Profile
                    </Button>
                </div>
                <span className={styles['header-bio']}>
                    {user.bio || 'You don\'t have a bio yet.'}
                </span>
            </div>
        </div>
    )
}