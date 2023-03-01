import styles from './Group.module.scss';
import { useAppSelector } from "@/redux/store";
import { selectTaskInfo } from "@/redux/teams/selectors";
import { useTask } from './GroupTask';

export const GroupTaskContent = () => {
    const { taskId } = useTask();
    const { description } = useAppSelector(state => selectTaskInfo(state, taskId));

    return(
        <span className={styles['task-content']}>
            {description || (
                <i>
                    This issue is missing a description
                </i>
            )}
        </span>
    )
}