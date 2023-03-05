import styles from './Group.module.scss';
import { TimeIcon } from "@/assets/icons/TimeIcon";
import { useAppSelector } from "@/redux/store";
import { selectTaskInfo } from "@/redux/teams/selectors";
import { useTask } from "./GroupTask"
import { GroupTaskAssignees } from './GroupTaskAssignees';

export const GroupTaskFooter = () => {
    const { taskId } = useTask();
    const { due_at } = useAppSelector(state => selectTaskInfo(state, taskId));
    
    let readableDate: string | undefined;
    if(due_at) {
        const date = new Date(due_at);
        readableDate = date.toLocaleString('en', { dateStyle: 'medium' }).split(',')[0];
    }
    return(
        <div className={styles['task-footer']}>
            <div className={styles['due-at']}>
                {readableDate && (
                    <>
                    <TimeIcon />
                    {readableDate}
                    </>
                )}
            </div>
            <GroupTaskAssignees taskId={taskId} />
        </div>
    )
}