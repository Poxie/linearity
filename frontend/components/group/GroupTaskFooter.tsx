import styles from './Group.module.scss';
import { useTask } from "./GroupTask"
import { GroupTaskAssignees } from './GroupTaskAssignees';
import { GroupTaskDueAt } from './GroupTaskDueAt';

export const GroupTaskFooter = () => {
    const { taskId } = useTask();

    return(
        <div className={styles['task-footer']}>
            <GroupTaskDueAt taskId={taskId} />
            <GroupTaskAssignees taskId={taskId} />
        </div>
    )
}