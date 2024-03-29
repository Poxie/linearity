import { ChangeEvent, useRef } from 'react';
import Button from '../button';
import styles from './Profiles.module.scss';
import { useProfile } from './UserProfile';

export const ProfileAvatar = () => {
    const { localUpdate, profile: { avatar, name } } = useProfile();

    const input = useRef<HTMLInputElement>(null);

    const updateAvatar = (e: ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files) return;

        const avatar = e.target.files[0];
        if(!avatar) return e.target.value = '';

        localUpdate({ avatar });
    }

    let avatarUrl = avatar ? `${process.env.NEXT_PUBLIC_IMG_ENDPOINT}/avatar/${avatar}` : undefined;
        if(avatar instanceof File) {
        const blob = new Blob([avatar]);
        avatarUrl = URL.createObjectURL(blob);
    }
    return(
        <div className={styles['avatar-container']}>
            <div 
                className={styles['avatar']}
                style={avatarUrl ? { backgroundImage: `url(${avatarUrl})` } : undefined}
            >
                <input 
                    onChange={updateAvatar}
                    type="file"
                    ref={input} 
                />
                {!avatarUrl ? name[0].toUpperCase() : ''}
            </div>
            <div className={styles['avatar-buttons']}>
                <Button 
                    className={styles['avatar-button']}
                    onClick={() => input.current?.click()}
                >
                    Change avatar
                </Button>
                {avatarUrl && (
                    <Button 
                        className={styles['remove-avatar-button']}
                        onClick={() => localUpdate({ avatar: null })}
                    >
                        Remove avatar
                    </Button>
                )}
            </div>
        </div>
    )
}