import { usePortal } from '@/contexts/portal';
import { TaskPortal } from '@/portals/task';
import styles from './Group.module.scss';
import { useBlock } from './GroupBlock';
import { useTask } from './GroupTask';

export const GroupViewTaskButton = () => {
    const { taskId } = useTask();
    const { blockId } = useBlock();
    const { setPortal } = usePortal();
    
    const viewTask = () => {
        setPortal(
            <TaskPortal 
                blockId={blockId}
                taskId={taskId}
            />
        )
    }

    return(
        <button 
            aria-label="View task"
            className={styles['task-button']}
            onClick={viewTask}
        />
    )
}