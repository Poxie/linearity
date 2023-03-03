import { EditIcon } from '@/assets/icons/EditIcon';
import { TrashIcon } from '@/assets/icons/TrashIcon';
import { useModal } from '@/contexts/modal';
import { useTask } from '@/hooks/useTask';
import { EditTaskModal } from '@/modals/edit-task/EditTaskModal';
import { useState } from 'react';
import styles from './TaskRow.module.scss';

export const TaskRowButtons: React.FC<{
    taskId: number;
}> = ({ taskId }) => {
    const { setModal } = useModal();
    const { removeSelf } = useTask(taskId);

    const [loading, setLoading] = useState(false);

    const editTask = () => setModal(<EditTaskModal taskId={taskId} />);
    const removeTask = () => {
        setLoading(true);
        removeSelf();
    }

    return(
        <div className={styles['buttons']}>
            <button onClick={editTask}>
                <EditIcon />
            </button>
            <button 
                onClick={removeTask}
                disabled={loading}
            >
                <TrashIcon />
            </button>
        </div>
    )
}