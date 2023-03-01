import styles from './AddBlockModal.module.scss';
import { Input } from "@/components/input";
import { ModalHeader } from "../ModalHeader"
import { ModalMain } from "../ModalMain";
import { ModalFooter } from '../ModalFooter';
import { useRef, useState } from 'react';
import { useAuth } from '@/contexts/auth';
import { Block } from '@/types';
import { useAppDispatch } from '@/redux/store';
import { addBlock } from '@/redux/teams/actions';
import { useModal } from '@/contexts/modal';

export const AddBlockModal: React.FC<{
    groupId: number;
}> = ({ groupId }) => {
    const { post } = useAuth();
    const { close } = useModal();
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(false);

    const name = useRef<HTMLInputElement>(null)
    const description = useRef<HTMLInputElement>(null)

    const createBlock = () => {
        if(!name.current?.value) return;

        setLoading(true);
        post<Block>(`/groups/${groupId}/blocks`, {
            name: name.current.value,
            description: description.current?.value
        }).catch(error => {
            console.error(error);
            setLoading(false);
        }).then(block => {
            if(!block) return;
            dispatch(addBlock(block));
            close();
        })
    }

    return(
        <>
        <ModalHeader>
            Create block
        </ModalHeader>
        <ModalMain className={styles['container']}>
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
            cancelLabel={'Cancel'}
            confirmLabel={'Create block'}
            onCancel={close}
            onConfirm={createBlock}
            confirmLoading={loading}
            confirmLoadingLabel={'Creating block...'}
        />
        </>
    )
}