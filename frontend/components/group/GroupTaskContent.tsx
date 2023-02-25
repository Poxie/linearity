import styles from './Group.module.scss';
import { useAppSelector } from "@/redux/store";
import { selectTaskInfo } from "@/redux/teams/selectors";
import { useBlock } from "./GroupBlock";
import { useTask } from "./GroupTask"

export const GroupTaskContent = () => {
    const { taskId } = useTask();
    const { blockId } = useBlock();
    const { description } = useAppSelector(state => selectTaskInfo(state, blockId, taskId));

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