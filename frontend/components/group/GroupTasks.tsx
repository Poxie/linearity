import { useAppSelector } from '@/redux/store';
import { selectBlockTaskIds } from '@/redux/teams/selectors';
import styles from './Group.module.scss';
import { useBlock } from './GroupBlock';
import { GroupTask } from './GroupTask';

export const GroupTasks = () => {
    const { groupId, blockId } = useBlock();
    const taskIds = useAppSelector(state => selectBlockTaskIds(state, groupId, blockId))
    
    return(
        <div className={styles['block-tasks']}>
            {taskIds?.map(taskId => (
                <GroupTask 
                    taskId={taskId}
                    key={taskId}
                />
            ))}
        </div>
    )
}