import styles from './AddGroup.module.scss';
import { Input } from "@/components/input";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { selectTeamById } from "@/redux/teams/selectors";
import { ModalFooter } from "../ModalFooter";
import { ModalHeader } from "../ModalHeader";
import { ModalMain } from "../ModalMain";
import { useModal } from '@/contexts/modal';
import { useRef, useState } from 'react';
import { useAuth } from '@/contexts/auth';
import { Group } from '@/types';
import { addGroup } from '@/redux/teams/actions';
import { useRouter } from 'next/navigation';

export const AddGroupModal: React.FC<{
    teamId: number;
}> = ({ teamId }) => {
    const { post } = useAuth();
    const { close } = useModal();
    const { push } = useRouter();
    const dispatch = useAppDispatch();

    const team = useAppSelector(state => selectTeamById(state, teamId));

    const [loading, setLoading] = useState(false);
    const name = useRef<HTMLInputElement>(null);
    const description = useRef<HTMLInputElement>(null);

    const onConfirm = () => {
        if(!name.current?.value) return;

        setLoading(true);
        post<Group>(`/teams/${teamId}/groups`, {
            name: name.current.value,
            description: description.current?.value
        }).then(group => {
            dispatch(addGroup(group));
            push(`/teams/${teamId}/groups/${group.id}`);
            close();
        }).catch(error => {
            console.log(error);
            setLoading(false);
        })
    }

    return(
        <>
        <ModalHeader subHeader={`Add a new group to ${team?.name}`}>
           Create group 
        </ModalHeader>
        <ModalMain className={styles['main']}>
            <Input 
                placeholder={'Name'}
                ref={name}
            />
            <Input 
                placeholder={'Description'}
                ref={description}
                textArea
            />
        </ModalMain>
        <ModalFooter 
            cancelLabel={'Close'}
            confirmLabel={'Create group'}
            onCancel={close}
            onConfirm={onConfirm}
            confirmLoading={loading}
            confirmLoadingLabel={'Creating group...'}
        />
        </>
    )
}