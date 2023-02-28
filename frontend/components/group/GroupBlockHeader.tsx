import styles from './Group.module.scss';
import { useAppSelector } from "@/redux/store";
import { selectBlockInfo, selectBlockTaskCount } from "@/redux/teams/selectors";
import { useBlock } from "./GroupBlock"

export const GroupBlockHeader: React.FC<{
    onMouseUp: () => void;
    onMouseDown: () => void;
}> = ({ onMouseDown, onMouseUp }) => {
    const { blockId } = useBlock();
    const { name } = useAppSelector(state => selectBlockInfo(state, blockId));
    const taskCount = useAppSelector(state => selectBlockTaskCount(state, blockId));

    return(
        <div 
            className={styles['block-header']}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
        >
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