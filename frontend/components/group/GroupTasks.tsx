import { useAppSelector } from '@/redux/store';
import { selectPositionedTasks } from '@/redux/teams/selectors';
import { useRef } from 'react';
import styles from './Group.module.scss';
import { useBlock } from './GroupBlock';
import { GroupTask } from './GroupTask';

export const GroupTasks = () => {
    const { blockId } = useBlock();
    const tasks = useAppSelector(state => selectPositionedTasks(state, blockId));

    const ref = useRef<HTMLUListElement>(null);
    
    return(
        <ul 
            style={{ padding: !tasks.length ? 0 : 'var(--spacing-secondary)' }}
            className={styles['block-tasks']} 
            ref={ref}
        >
            {tasks?.map(task => (
                <GroupTask 
                    taskId={task.id}
                    index={task.position}
                    container={ref}
                    key={task.id}
                />
            ))}
        </ul>
    )
}