import styles from './Group.module.scss';
import { useAppSelector } from "@/redux/store";
import { selectBlockInfo, selectBlockTaskCount } from "@/redux/teams/selectors";
import { useBlock } from "./GroupBlock"

export const GroupBlockHeader = () => {
    const { blockId, groupId } = useBlock();
    const { name } = useAppSelector(state => selectBlockInfo(state, groupId, blockId));
    const taskCount = useAppSelector(state => selectBlockTaskCount(state, groupId, blockId));

    return(
        <div className={styles['block-header']}>
            <div className={styles['block-header-main']}>
                <span className={styles['block-title']}>
                    {name}
                </span>
                <span className={styles['task-count']}>
                    {taskCount} issue{(taskCount ?? Infinity) === 1 ? '' :'s'}
                </span>
            </div>
        </div>
    )
}