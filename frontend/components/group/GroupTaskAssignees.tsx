import styles from './Group.module.scss';
import { useAppSelector } from "@/redux/store";
import { selectTaskAssignees } from "@/redux/teams/selectors";
import { useBlock } from "./GroupBlock";
import { useTask } from "./GroupTask"

export const GroupTaskAssignees = () => {
    const { taskId } = useTask();
    const { blockId } = useBlock();
    const assignees = useAppSelector(state => selectTaskAssignees(state, blockId, taskId));

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