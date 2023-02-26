import styles from './TaskPortal.module.scss';
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { selectTaskAssignees, selectTaskInfo, selectTaskLabels } from "@/redux/teams/selectors";
import { Portal } from "../Portal";
import { TaskPortalGroup } from "./TaskPortalGroup";
import { TaskPortalAssignee } from './TaskPortalAssignee';
import { AddIcon } from '@/assets/icons/AddIcon';
import { Member } from '@/types';
import { TeamItems } from '@/popouts/team-items/TeamItems';
import { usePopout } from '@/contexts/popout';
import { useRef } from 'react';
import { useAuth } from '@/contexts/auth';
import { addTaskAssignee, removeTaskAssignee } from '@/redux/teams/actions';

export const TaskPortal: React.FC<{
    blockId: number;
    taskId: number;
}> = ({ blockId, taskId }) => {
    const { setPopout } = usePopout();
    const { put, destroy } = useAuth();
    const dispatch = useAppDispatch();
    
    const { title, description, team_id } = useAppSelector(state => selectTaskInfo(state, blockId, taskId));
    const labels = useAppSelector(state => selectTaskLabels(state, blockId, taskId));
    const assignees = useAppSelector(state => selectTaskAssignees(state, blockId, taskId));

    const assigneeRef = useRef<HTMLButtonElement>(null);

    const toggleAssignee = async (member: Member) => {
        const exists = assignees?.find(assignee => assignee.id === member.id);
        
        const addAssignee = () => dispatch(addTaskAssignee(blockId, taskId, member));
        const removeAssignee = () => dispatch(removeTaskAssignee(blockId, taskId, member.id));

        if(exists) {
            removeAssignee();
            destroy(`/tasks/${taskId}/assignees/${member.id}`)
                .catch(addAssignee)
        } else {
            addAssignee();
            put(`/tasks/${taskId}/assignees/${member.id}`)
                .catch(removeAssignee);
        }
    }

    const openAssigneePortal = () => {
        if(!team_id) return;
        
        setPopout({
            popout: (
                <TeamItems 
                    teamId={team_id}
                    type={'members'}
                    onSelect={item => toggleAssignee(item as Member)}
                    closeOnSelect
                />
            ),
            position: 'left',
            ref: assigneeRef
        })
    }

    return(
        <Portal 
            header={title || ''} 
            subHeader={description}
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
                        onClick={openAssigneePortal}
                        ref={assigneeRef}
                    />
                </ul>
            </TaskPortalGroup>
        </Portal>
    )
}