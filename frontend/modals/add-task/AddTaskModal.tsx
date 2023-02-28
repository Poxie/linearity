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
import { Label, Member, Task } from '@/types';
import { addTask } from '@/redux/teams/actions';

export const AddTaskModal: React.FC<{
    blockId: number;
}> = ({ blockId }) => {
    const { close } = useModal();
    const { post } = useAuth();

    const [loading, setLoading] = useState(false);
    const [assignees, setAssinees] = useState<Member[]>([]);
    const [labels, setLabels] = useState<Label[]>([]);

    const dispatch = useAppDispatch();
    const block = useAppSelector(state => selectBlockInfo(state, blockId));
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);

    if(!block.team_id) return null;

    const toggleAssignee = (assignee: Member) => {
        setAssinees(prev => {
            const exists = prev.find(member => member.id === assignee.id);
            if(exists) return prev.filter(member => member.id !== assignee.id);
            return [...prev, ...[assignee]];
        });
    }
    const toggleLabel = (label: Label) => {
        setLabels(prev => {
            const exists = prev.find(l => l.id === label.id);
            if(exists) return prev.filter(l => l.id !== label.id);
            return [...prev, ...[label]];
        });
    }

    const onConfirm = async () => {
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
                description,
                assignees: assignees.map(assignee => assignee.id),
                labels: labels.map(label => label.id)
            });

            // Adding task to redux
            dispatch(addTask(task));

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
            <AddTaskAssignees 
                teamId={block.team_id}
                assignees={assignees}
                toggleAssignee={toggleAssignee}
            />
            <AddTaskLabels 
                teamId={block.team_id}
                labels={labels}
                toggleLabel={toggleLabel}
            />
        </ModalMain>
        <ModalFooter 
            cancelLabel={'Cancel'}
            confirmLabel={'Add issue'}
            onCancel={close}
            onConfirm={onConfirm}
            confirmLoading={loading}
            confirmLoadingLabel={'Adding issue...'}
        />
        </>
    )
}