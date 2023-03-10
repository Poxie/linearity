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
import { TimeSeletor } from '@/components/time-selector';
import { AddTaskGroup } from './AddTaskGroup';
import { useBlock } from '@/hooks/useBlock';

export const AddTaskModal: React.FC<{
    blockId: number;
}> = ({ blockId }) => {
    const { close } = useModal();
    const { post } = useAuth();
    const { addTask } = useBlock(blockId);

    const [loading, setLoading] = useState(false);
    const [assignees, setAssinees] = useState<Member[]>([]);
    const [labels, setLabels] = useState<Label[]>([]);
    const [dueAt, setDueAt] = useState<null | number>(null);

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
        setLoading(true);
        await addTask({
            title,
            description,
            assignees: assignees.map(assignee => assignee.id),
            labels: labels.map(label => label.id),
            due_at: dueAt
        }).catch(error => {
            console.log(error);
            setLoading(false);
        })

        close();
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
            <AddTaskGroup header={'Due date'}>
                <TimeSeletor 
                    onChange={date => setDueAt(date ? date.getTime() : null)}
                    emptyLabel={'Due date not selected'}
                />
            </AddTaskGroup>
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