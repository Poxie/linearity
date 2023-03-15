import { useRef, useState } from 'react';
import Button from '../button';
import { Input } from '../input';
import { StatusMessage } from '../status-message';
import { ProfileAvatar } from './ProfileAvatar';
import styles from './Profiles.module.scss';
import { useProfile } from './UserProfile';

export const EditProfile = () => {
    const { profile: { name, bio }, localUpdate, update, reset, hasChanges } = useProfile();
    
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<null | {
        message: string, type: 'success' | 'danger' | 'info'
    }>(null);

    const onClick = () => {
        setStatus(null);
        setLoading(true);
        update({
            onSuccess: () => {
                setLoading(false);
                setStatus({
                    type: 'success',
                    message: 'Successfully updated profile'
                })
            },
            onError: error => {
                setLoading(false);
                setStatus({
                    type: 'danger',
                    message: error.message
                })
            },
            onNoChanges: () => {
                setLoading(false);
                setStatus({
                    type: 'info',
                    message: 'No changes were made'
                })
            }
        })
    }

    return(
        <div className={styles['profile']}>
            <ProfileAvatar />
            <Input 
                defaultValue={name}
                placeholder={'Name'}
                onChange={name => localUpdate({ name })}
            />
            <Input 
                defaultValue={bio || ''}
                placeholder={'bio'}
                onChange={bio => localUpdate({ bio })}
                textArea
            />
            {status && (
                <StatusMessage 
                    {...status}
                />
            )}
            <div className={styles['profile-buttons']}>
                {hasChanges && (
                    <Button 
                        type={'transparent'}
                        onClick={reset}
                    >
                        Reset
                    </Button>
                )}
                <Button 
                    onClick={onClick} 
                    disabled={loading}
                >
                    {loading ? 'Updating...' : 'Update'}
                </Button>
            </div>
        </div>
    )
}