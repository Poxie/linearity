import styles from './AddTeam.module.scss';
import { Input } from "@/components/input"
import { ModalHeader } from "../ModalHeader"
import { ModalMain } from "../ModalMain"
import { ModalFooter } from '../ModalFooter';
import { useRef, useState } from 'react';
import { useAuth } from '@/contexts/auth';
import { useAppDispatch } from '@/redux/store';
import { addTeam } from '@/redux/teams/actions';
import { StatusMessage } from '@/components/status-message';
import { useModal } from '@/contexts/modal';
import { AddTeamGroup } from './AddTeamGroup';

export const AddTeamModal = () => {
    const { post } = useAuth();
    const { close, pushModal } = useModal();
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);

    const name = useRef<HTMLInputElement>(null);
    const description = useRef<HTMLInputElement>(null);

    const onConfirm = () => {
        if(!name.current?.value) return setError('Name is required');

        pushModal(
            <AddTeamGroup 
                name={name.current.value}
                description={description.current?.value}
            />
        )
    }
    const onChange = () => setError(null);

    return(
        <>
        <ModalHeader subHeader={'Create a new workspace for your team, with dedicated groups and tons of customization.'}>
            Create team
        </ModalHeader>
        <ModalMain className={styles['main']}>
            <>
            <Input 
                placeholder={'Team name'}
                onChange={onChange}
                ref={name}
            />
            <Input 
                placeholder={'Team description'}
                onChange={onChange}
                ref={description}
                textArea
            />
            {error && (
                <StatusMessage 
                    message={error}
                    type={'danger'}
                />
            )}
            </>
        </ModalMain>
        <ModalFooter 
            cancelLabel={'Close'}
            confirmLabel={'Next'}
            onCancel={close}
            onConfirm={onConfirm}
        />
        </>
    )
}