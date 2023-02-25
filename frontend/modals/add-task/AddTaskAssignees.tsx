import styles from './AddTask.module.scss';
import { AddIcon } from '@/assets/icons/AddIcon';
import { AddTaskGroup } from "./AddTaskGroup"

export const AddTaskAssignees = () => {
    return(
        <AddTaskGroup header={'Assignees'}>
            {/* <div className={styles['assignee']}>
                <div className={styles['assignee-icon']}>
                    <AddIcon />
                </div>
                <span className={styles['assignee-text']}>
                    Add assignee
                </span>
            </div> */}
            <button 
                className={styles['add-item']}
                aria-label={'Add assignee'}
            >
                <AddIcon />
            </button>
        </AddTaskGroup>
    )
}