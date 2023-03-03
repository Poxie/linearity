import styles from './TaskRow.module.scss';
import { useAppSelector } from "@/redux/store"
import { selectTaskInfo } from "@/redux/teams/selectors"
import { TimeSeletor } from "../time-selector"
import { useTask } from '@/hooks/useTask';
import { TimeIcon } from '@/assets/icons/TimeIcon';

export const TaskRowDueAt: React.FC<{
    taskId: number;
}> = ({ taskId }) => {
    const { due_at } = useAppSelector(state => selectTaskInfo(state, taskId));
    const { updateProperty } = useTask(taskId);

    const updateDueAt = (date: Date | null) => updateProperty('due_at', date?.getTime(), due_at);

    return(
        <div className={styles['due-at']}>
            {due_at && (
                <TimeIcon />
            )}
            <TimeSeletor 
                onChange={updateDueAt}
                defaultTime={due_at}
                emptyLabel={'Due date not set'}
                popoutPosition={'left'}
                className={styles['time-selector']}
            />
        </div>
    )
}