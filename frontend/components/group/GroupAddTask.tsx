import styles from './Group.module.scss';
import { useAppSelector } from "@/redux/store"
import { selectBlockInfo } from "@/redux/teams/selectors"
import Button from "../button"
import { useBlock } from "./GroupBlock"

export const GroupAddTask = () => {
    const { groupId, blockId } = useBlock();
    const { name } = useAppSelector(state => selectBlockInfo(state, groupId, blockId));

    return(
        <Button 
            type={'hollow'}
            className={styles['add-task-button']}
        >
            Add issue to {name}
        </Button>
    )
}