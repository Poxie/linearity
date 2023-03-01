import { useAppSelector } from '@/redux/store';
import { selectPositionedTasks } from '@/redux/teams/selectors';
import styles from './Group.module.scss';
import { useBlock } from './GroupBlock';
import { GroupMovableTask } from './GroupMovableTask';

export const GroupTasks = () => {
    const { blockId } = useBlock();
    const tasks = useAppSelector(state => selectPositionedTasks(state, blockId));
    
    const className = [
        styles['block-tasks'],
        !tasks.length ? styles['block-empty'] : ''
    ].join(' ');
    return(
        <ul className={className}>
            {tasks?.map(task => (
                <GroupMovableTask 
                    taskId={task.id}
                    index={task.position}
                    key={task.id}
                />
            ))}
        </ul>
    )
}