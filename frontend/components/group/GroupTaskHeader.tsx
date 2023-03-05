import styles from './Group.module.scss';
import { useAppSelector } from "@/redux/store";
import { selectTaskInfo } from "@/redux/teams/selectors";
import { useTask } from './GroupTask';

export const GroupTaskHeader = () => {
    const { taskId } = useTask();
    const { title } = useAppSelector(state => selectTaskInfo(state, taskId));

    return(
        <span className={styles['task-title']}>
            {title}
        </span>
    )
}