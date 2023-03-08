import { useUser } from '@/hooks/useUser';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { updateUser } from '@/redux/user/actions';
import { selectUser } from '@/redux/user/selectors';
import { User } from '@/types';
import { useRef, useState } from 'react';
import Button from '../button';
import { Input } from '../input';
import { StatusMessage } from '../status-message';
import styles from './Profiles.module.scss';

export const EditProfile = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const { updateProperty } = useUser(user?.id as number);

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<null | {
        message: string, type: 'success' | 'danger'
    }>(null);

    const prevName = useRef(user?.name);
    const prevBio = useRef(user?.bio);
    const name = useRef<HTMLInputElement>(null);
    const bio = useRef<HTMLInputElement>(null);

    const onChange = (property: keyof User, text: string) => dispatch(updateUser(property, text));
    const update = () => {
        const props = ([
            [prevName.current, name.current?.value, 'name'], 
            [prevBio.current, bio.current?.value, 'bio']
        ] as [prevValue: any, value: any, property: keyof User][]).filter(([newValue, prevValue]) => newValue !== prevValue);

        if(props.length) setLoading(true);
        props.forEach(([prevValue, value, property]) => {
            updateProperty({
                property,
                value,
                prevValue,
                onError: error => {
                    setStatus({
                        message: error.message,
                        type: 'danger'
                    })
                    setLoading(false);
                },
                onSuccess: () => {
                    if(property === 'name') prevName.current = value;
                    if(property === 'bio') prevBio.current = value;
                    setStatus({
                        message: 'Successfully updated profile',
                        type: 'success'
                    })
                    setLoading(false);
                }
            })
        })
    }

    return(
        <div className={styles['profile']}>
            <Input 
                defaultValue={user?.name}
                placeholder={'Name'}
                onChange={text => onChange('name', text)}
                ref={name}
            />
            <Input 
                defaultValue={user?.bio || ''}
                placeholder={'bio'}
                onChange={text => onChange('bio', text)}
                ref={bio}
                textArea
            />
            {status && (
                <StatusMessage 
                    {...status}
                />
            )}
            <div className={styles['profile-buttons']}>
                <Button onClick={update} disabled={loading}>
                    {loading ? 'Updating...' : 'Update'}
                </Button>
            </div>
        </div>
    )
}