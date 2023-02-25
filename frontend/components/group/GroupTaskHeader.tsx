import styles from './Group.module.scss';
import { useAppSelector } from "@/redux/store";
import { selectTaskInfo } from "@/redux/teams/selectors";
import { useBlock } from "./GroupBlock";
import { useTask } from "./GroupTask"
import { GroupTaskAssignees } from './GroupTaskAssignees';

export const GroupTaskHeader = () => {
    const { taskId } = useTask();
    const { blockId } = useBlock();
    const { title } = useAppSelector(state => selectTaskInfo(state, blockId, taskId));

    return(
        <div className={styles['task-header']}>
            <GroupTaskAssignees />
            <span className={styles['task-title']}>
                {title}
            </span>
        </div>
    )
}