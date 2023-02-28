import { usePortal } from '@/contexts/portal';
import { TaskPortal } from '@/portals/task';
import styles from './Group.module.scss';
import { useTask } from './GroupTask';

export const GroupViewTaskButton = () => {
    const { taskId } = useTask();
    const { setPortal } = usePortal();
    
    const viewTask = () => {
        setPortal(
            <TaskPortal
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