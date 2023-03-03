import styles from './TaskRow.module.scss';
import { useModal } from "@/contexts/modal"
import { EditTaskModal } from '@/modals/edit-task/EditTaskModal';

export const TaskRowView: React.FC<{
    taskId: number;
}> = ({ taskId }) => {
    const { setModal } = useModal();

    const onClick = () => setModal(<EditTaskModal taskId={taskId} />);

    return(
        <button 
            onClick={onClick}
            className={styles['view-task']}
            aria-label={'View task'}
        />
    )
}