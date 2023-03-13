import styles from './AddTeam.module.scss';
import { Input } from "@/components/input";
import { ModalHeader } from "../ModalHeader"
import { ModalMain } from "../ModalMain";
import { ModalFooter } from '../ModalFooter';
import { useRef, useState } from 'react';
import { useModal } from '@/contexts/modal';
import { useAuth } from '@/contexts/auth';
import { addGroup, addTeam } from '@/redux/teams/actions';
import { Group, Team } from '@/types';
import { useAppDispatch } from '@/redux/store';
import { useRouter } from 'next/router';
import { StatusMessage } from '@/components/status-message';

export const AddTeamGroup: React.FC<{
    name: string;
    description: string | undefined;
}> = ({ name, description }) => {
    const { post } = useAuth();
    const { push } = useRouter();
    const { close, goBack } = useModal();
    const dispatch = useAppDispatch();

    const [error, setError] = useState<null | string>(null);
    const [loading, setLoading] = useState(false);

    const groupName = useRef<HTMLInputElement>(null);
    const groupDescription = useRef<HTMLInputElement>(null);

    const onConfirm = async () => {
        if(!groupName.current?.value) return setError('Group name is required');

        setLoading(true);
        const team = await post<Team>(`/teams`, {
            name,
            description
        })

        const group = await post<Group>(`/teams/${team.id}/groups`, {
            name: groupName.current.value,
            description: groupDescription.current?.value
        });
        setLoading(false);

        dispatch(addTeam({...team, primary_group_id: group.id}));
        dispatch(addGroup(group));

        push(`/teams/${team.id}/groups/${group.id}`);
        close();
    }
    const onChange = () => setError(null);

    return(
        <>
        <ModalHeader subHeader={'Add a group to your team.'}>
            Add group
        </ModalHeader>
        <ModalMain className={styles['main']}>
            <Input 
                placeholder={'Group name'}
                onChange={onChange}
                ref={groupName}
            />
            <Input 
                placeholder={'Group description'}
                ref={groupDescription}
                onChange={onChange}
                textArea
            />
            <>
            {error && (
                <StatusMessage 
                    message={error}
                    type={'danger'}
                />
            )}
            </>
        </ModalMain>
        <ModalFooter 
            cancelLabel={'Go back'}
            onCancel={goBack}
            confirmLabel={'Create team'}
            onConfirm={onConfirm}
            confirmLoading={loading}
            confirmLoadingLabel={'Creating team...'}
        />
        </>
    )
}