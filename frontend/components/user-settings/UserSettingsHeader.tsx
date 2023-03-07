"use client";

import { useUser } from '@/hooks/useUser';
import { useAppSelector } from '@/redux/store';
import { selectUser, selectUserLoading } from '@/redux/user/selectors';
import { useRouter } from 'next/navigation';
import { EditableText } from '../editable-text';
import styles from './UserSettings.module.scss';

export const UserSettingsHeader = () => {
    const { replace } = useRouter();
    const user = useAppSelector(selectUser);
    const loading = useAppSelector(selectUserLoading);
    const { updateProperty } = useUser(user?.id as number);

    if(loading) return null
    if(!user) {
        replace(`/login`);
        return null;
    }
    
    return(
        <div className={styles['header']}>
            <div className={styles['header-icon']}>
                {user?.name[0].toUpperCase()}
            </div>
            <div className={styles['header-text']}>
                <EditableText 
                    defaultValue={user?.name}
                    onChange={text => updateProperty('name', text, user.name)}
                    size={'large'}
                    requiresValue
                />
                <EditableText 
                    defaultValue={user?.bio}
                    placeholder={'Add a description of yourself...'}
                    onChange={text => updateProperty('bio', text, user.bio)}
                />
            </div>
        </div>
    )
}