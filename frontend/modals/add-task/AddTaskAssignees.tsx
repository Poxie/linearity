import styles from './AddTask.module.scss';
import { AddIcon } from '@/assets/icons/AddIcon';
import { AddTaskGroup } from "./AddTaskGroup"
import { usePopout } from '@/contexts/popout';
import { TeamItems } from '@/popouts/team-items/TeamItems';
import { useRef } from 'react';
import { Member } from '@/types';

export const AddTaskAssignees: React.FC<{
    teamId: number;
    assignees: Member[];
    toggleAssignee: (assignee: Member) => void;
}> = ({ teamId, assignees, toggleAssignee }) => {
    const { setPopout } = usePopout();
    const ref = useRef<HTMLButtonElement>(null);

    const openPopout = () => {
        setPopout({
            popout: (
                <TeamItems 
                    teamId={teamId} 
                    type={'members'} 
                    onSelect={item => toggleAssignee(item as Member)} 
                    closeOnSelect
                />
            ),
            ref
        })
    }

    return(
        <AddTaskGroup header={'Assignees'} className={styles['list']}>
            {assignees.length !== 0 && (
                <ul>
                    {assignees.map(assignee => (
                        <li key={assignee.id}>
                            <button 
                                className={styles['member-item']}
                                onClick={() => toggleAssignee(assignee)}
                            >
                                <span className={styles['member-icon']}>
                                    {assignee.name[0]}
                                </span>
                                {assignee.name}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            <button 
                className={styles['add-item']}
                aria-label={'Add assignee'}
                onClick={openPopout}
                ref={ref}
            >
                <AddIcon />
            </button>
        </AddTaskGroup>
    )
}