import styles from './Group.module.scss';
import { TimeIcon } from "@/assets/icons/TimeIcon";
import { useAppSelector } from "@/redux/store";
import { selectTaskInfo } from "@/redux/teams/selectors";
import { useTask } from "./GroupTask"

export const GroupTaskFooter = () => {
    const { taskId } = useTask();
    const { due_at } = useAppSelector(state => selectTaskInfo(state, taskId));
    if(!due_at) return null;
    
    const date = new Date(due_at);
    const readableDate = date.toLocaleString('en', { dateStyle: 'medium' }).split(',')[0];
    return(
        <div className={styles['task-footer']}>
            <TimeIcon />
            {readableDate}
        </div>
    )
}