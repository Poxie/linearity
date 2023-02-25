import styles from './Group.module.scss';
import { useAppSelector } from "@/redux/store"
import { selectBlockInfo } from "@/redux/teams/selectors"
import Button from "../button"
import { useBlock } from "./GroupBlock"
import { useModal } from '@/contexts/modal';
import { AddTaskModal } from '@/modals/add-task/AddTaskModal';

export const GroupAddTask = () => {
    const { setModal } = useModal();
    const { groupId, blockId } = useBlock();
    const { name } = useAppSelector(state => selectBlockInfo(state, groupId, blockId));

    const openModal = () => {
        setModal(
            <AddTaskModal 
                groupId={groupId}
                blockId={blockId}
            />
        )
    }

    return(
        <Button 
            type={'hollow'}
            className={styles['add-task-button']}
            onClick={openModal}
        >
            Add issue to {name}
        </Button>
    )
}