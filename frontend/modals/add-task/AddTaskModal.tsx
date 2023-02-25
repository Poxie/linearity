import styles from './AddTask.module.scss'
import { Input } from "@/components/input";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { selectBlockInfo } from "@/redux/teams/selectors";
import { ModalFooter } from "../ModalFooter";
import { ModalHeader } from "../ModalHeader"
import { ModalMain } from "../ModalMain"
import { AddTaskAssignees } from './AddTaskAssignees';
import { AddTaskLabels } from './AddTaskLabels';
import { useRef, useState } from 'react';
import { useModal } from '@/contexts/modal';
import { useAuth } from '@/contexts/auth';
import { Task } from '@/types';
import { addBlockTask } from '@/redux/teams/actions';

export const AddTaskModal: React.FC<{
    blockId: number;
}> = ({ blockId }) => {
    const { close } = useModal();
    const { post } = useAuth();

    const [loading, setLoading] = useState(false);

    const dispatch = useAppDispatch();
    const block = useAppSelector(state => selectBlockInfo(state, blockId));
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);

    const addTask = async () => {
        // Fetching input values
        const title = titleRef.current?.value;
        const description = descriptionRef.current?.value;

        // Making sure title is present
        if(!title) return;        

        // Creating task
        try {
            setLoading(true);
            const task = await post<Task>(`/blocks/${blockId}/tasks`, {
                title,
                description
            });

            // Adding task to redux
            dispatch(addBlockTask(blockId, task));

            close();
        } catch(error) {
            console.log(error);
            setLoading(false);
        }
    }

    return(
        <>
        <ModalHeader>
            Add issue to {block.name}
        </ModalHeader>
        <ModalMain className={styles['content']}>
            <Input 
                placeholder={'Title'}
                ref={titleRef}
            />
            <Input 
                placeholder={'Description'}
                textArea
                ref={descriptionRef}
            />
            <AddTaskAssignees />
            <AddTaskLabels />
        </ModalMain>
        <ModalFooter 
            cancelLabel={'Cancel'}
            confirmLabel={'Add issue'}
            onCancel={close}
            onConfirm={addTask}
            confirmLoading={loading}
            confirmLoadingLabel={'Adding issue...'}
        />
        </>
    )
}