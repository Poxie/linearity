import styles from './Group.module.scss';
import { useModal } from "@/contexts/modal"
import { EditTaskModal } from "@/modals/edit-task/EditTaskModal";
import { useTask } from "./GroupTask";

export const GroupTaskButton = () => {
    const { taskId } = useTask();
    const { setModal } = useModal();

    const viewTask = () =>  setModal(<EditTaskModal taskId={taskId} />)

    return(
        <button 
            aria-label="View task"
            onClick={viewTask}
            className={styles['edit-task-button']}
        />
    )
}