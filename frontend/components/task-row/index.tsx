import { useAppSelector } from '@/redux/store';
import { selectTaskInfo } from '@/redux/teams/selectors';
import styles from './TaskRow.module.scss';
import { TaskRowAssignees } from './TaskRowAssignees';
import { TaskRowButtons } from './TaskRowButtons';
import { TaskRowLabels } from './TaskRowLabels';
import { TaskRowView } from './TaskRowView';

export const TaskRow: React.FC<{
    taskId: number;
}> = ({ taskId }) => {
    const task = useAppSelector(state => selectTaskInfo(state, taskId));

    return(
        <div className={styles['container']}>
            <TaskRowView taskId={taskId} />
            <span>
                {task?.title}
            </span>
            <span className={styles['description']}>
                {task.description || <i>This issue is missing a description</i>}
            </span>
            <TaskRowLabels taskId={taskId} teamId={task.team_id as number} />
            <TaskRowAssignees taskId={taskId} teamId={task.team_id as number} />
            <TaskRowButtons taskId={taskId} />
        </div>
    )
}