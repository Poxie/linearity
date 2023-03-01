import styles from './Group.module.scss';
import { useAppSelector } from "@/redux/store";
import { selectTaskInfo } from "@/redux/teams/selectors";
import { GroupTaskAssignees } from './GroupTaskAssignees';
import { useTask } from './GroupTask';

export const GroupTaskHeader = () => {
    const { taskId } = useTask();
    const { title } = useAppSelector(state => selectTaskInfo(state, taskId));

    return(
        <div className={styles['task-header']}>
            <GroupTaskAssignees />
            <button 
                className={styles['task-title']}
                aria-label={'View task'}
            >
                {title}
            </button>
        </div>
    )
}