import styles from './TaskRow.module.scss';
import { useAppSelector } from "@/redux/store"
import { selectTaskInfo } from "@/redux/teams/selectors"
import { TimeSeletor } from "../time-selector"

export const TaskRowDueAt: React.FC<{
    taskId: number;
}> = ({ taskId }) => {
    const { due_at } = useAppSelector(state => selectTaskInfo(state, taskId));
    return(
        <TimeSeletor 
            onChange={console.log}
            defaultTime={due_at}
            emptyLabel={'Due date not set'}
            popoutPosition={'left'}
            className={styles['due-at']}
        />
    )
}