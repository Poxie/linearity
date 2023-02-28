import styles from './Group.module.scss';
import { useAppSelector } from "@/redux/store";
import { selectTaskAssignees } from "@/redux/teams/selectors";
import { useTask } from "./GroupTask"

export const GroupTaskAssignees = () => {
    const { taskId } = useTask();
    const assignees = useAppSelector(state => selectTaskAssignees(state, taskId));

    const primaryAssignee = assignees ? assignees[0] : undefined;
    return(
        <div className={styles['task-assignees']}>
            {primaryAssignee ? (
                <span>
                    {primaryAssignee.name[0]}
                </span>
            ) : (
                <span>
                    ?
                </span>
            )}
        </div>
    )
}