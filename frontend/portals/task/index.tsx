import styles from './TaskPortal.module.scss';
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { selectTaskAssignees, selectTaskInfo, selectTaskLabels } from "@/redux/teams/selectors";
import { Portal } from "../Portal";
import { TaskPortalGroup } from "./TaskPortalGroup";
import { TaskPortalAssignee } from './TaskPortalAssignee';
import { AddIcon } from '@/assets/icons/AddIcon';
import { Label, Member } from '@/types';
import { TeamItems } from '@/popouts/team-items/TeamItems';
import { usePopout } from '@/contexts/popout';
import { RefObject, useRef } from 'react';
import { useAuth } from '@/contexts/auth';
import { addTaskAssignee, addTaskLabel, removeTaskAssignee, removeTaskLabel } from '@/redux/teams/actions';

export const TaskPortal: React.FC<{
    taskId: number;
}> = ({ taskId }) => {
    const { setPopout } = usePopout();
    const { put, destroy } = useAuth();
    const dispatch = useAppDispatch();
    
    const { title, description, team_id } = useAppSelector(state => selectTaskInfo(state, taskId));
    const labels = useAppSelector(state => selectTaskLabels(state, taskId));
    const assignees = useAppSelector(state => selectTaskAssignees(state, taskId));

    const assigneeRef = useRef<HTMLButtonElement>(null);
    const labelRef = useRef<HTMLButtonElement>(null);

    const toggleItem = async (item: Member | Label, path: 'assignees' | 'labels') => {
        const exists = (path === 'assignees' ? assignees : labels as {id: number}[])?.find(i => i.id === item.id);
        
        const addAction = path === 'assignees' ? addTaskAssignee : addTaskLabel;
        const removeAction = path === 'assignees' ? removeTaskAssignee : removeTaskLabel;
        
        const addItem = () => dispatch(addAction(taskId, item as any));
        const removeItem = () => dispatch(removeAction(taskId, item.id));

        if(exists) {
            removeItem();
            destroy(`/tasks/${taskId}/${path}/${item.id}`)
                .catch(addItem)
        } else {
            addItem();
            put(`/tasks/${taskId}/${path}/${item.id}`)
                .catch(removeItem);
        }
    }
    const openPortal = (ref: RefObject<HTMLButtonElement>, type: 'members' | 'labels') => {
        if(!team_id) return;

        setPopout({
            popout: (
                <TeamItems 
                    teamId={team_id}
                    type={type}
                    onSelect={item => toggleItem(item, type === 'members' ? 'assignees' : 'labels')}
                    closeOnSelect
                />
            ),
            position: type === 'members' ? 'left' : 'up',
            ref
        })
    }

    return(
        <Portal 
            header={title || ''} 
            subHeader={description || 'This issue is missing a description'}
        >
            <TaskPortalGroup header={'Labels'}>
                {labels && (
                    <ul className={styles['labels']}>
                        {labels?.map(label => (
                            <li 
                                style={{
                                    backgroundColor: label.color || 'var(--background-quaternary)',
                                    borderColor: label.color || 'var(--background-quaternary)'
                                }}
                                className={styles['label']}
                                key={label.id}
                            >
                                {label.name}
                            </li>
                        ))}
                        <li>
                            <button 
                                className={styles['add-label-button']}
                                aria-label={'Add label'}
                                onClick={() => openPortal(labelRef, 'labels')}
                                ref={labelRef}
                            >
                                <AddIcon />
                            </button>
                        </li>
                    </ul>
                )}
            </TaskPortalGroup>
            <TaskPortalGroup header={'Assignee(s)'}>
                <ul className={styles['assignees']}>
                    {assignees?.map(assignee => (
                        <TaskPortalAssignee 
                            icon={assignee.name[0]}
                            text={assignee.name}
                            key={assignee.id}
                        />
                    ))}
                    <TaskPortalAssignee 
                        icon={<AddIcon />}
                        text={'Add assignee'}
                        className={styles['add-assignee']}
                        onClick={() => openPortal(assigneeRef, 'members')}
                        ref={assigneeRef}
                    />
                </ul>
            </TaskPortalGroup>
        </Portal>
    )
}