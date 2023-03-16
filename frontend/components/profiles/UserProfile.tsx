import React from 'react';
import { useAppSelector } from '@/redux/store';
import { selectUser } from '@/redux/user/selectors';
import { User } from '@/types';
import { useState } from 'react';
import { EditProfile } from './EditProfile';
import { ProfilePreview } from './ProfilePreview';
import styles from './Profiles.module.scss';
import { useUser } from '@/hooks/useUser';

type ProfileUser = Omit<User, 'avatar'> & {
    avatar: null | string | File;
}
const ProfileContext = React.createContext({} as {
    profile: ProfileUser;
    localUpdate: (user: Partial<ProfileUser>) => void;
    update: ({
        onSuccess,
        onError,
        onNoChanges
    }: {
        onSuccess: () => void;
        onError: (error: Error) => void;
        onNoChanges: () => void;
    }) => void;
    reset: () => void;
    hasChanges: boolean;
});

export const useProfile = () => React.useContext(ProfileContext);

export const UserProfile = () => {
    const user = useAppSelector(selectUser);
    const { updateProperties } = useUser(user?.id as number);
    const [profile, setProfile] = useState(user as ProfileUser);

    const localUpdate = (user: Partial<ProfileUser>) => setProfile(prev => ({
        ...prev,
        ...user
    }));
    const update = async ({
        onSuccess,
        onError,
        onNoChanges
    }: {
        onSuccess: () => void;
        onError: (error: Error) => void;
        onNoChanges: () => void;
    }) => {
        const propsToUpdate = [
            [user?.name, profile.name, 'name'],
            [user?.bio, profile.bio, 'bio'],
            [user?.avatar, profile.avatar, 'avatar']
        ].filter(
            ([prevValue, newValue]) => prevValue !== newValue
        ) as [any, any, keyof User][];
        if(!propsToUpdate.length) return onNoChanges();
        
        const userProps: Partial<User> = {}
        propsToUpdate.forEach(([prevValue, newValue, property]) => userProps[property] = newValue);
        
        updateProperties({
            user: userProps,
            onSuccess,
            onError
        }).then(user => {
            localUpdate({ ...user });
        })
    }
    const reset = () => {
        if(!user) return;
        setProfile(user);
    }

    const hasChanges = Object.entries(profile).filter(([prop, val]) => user && user[prop as keyof User] !== val).length !== 0;
    
    const value = {
        profile,
        localUpdate,
        update,
        hasChanges,
        reset
    }
    return(
        <ProfileContext.Provider value={value}>
            <div className={styles['content']}>
                <EditProfile />
                <ProfilePreview />
            </div>
        </ProfileContext.Provider>
    )
}