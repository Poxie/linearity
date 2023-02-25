import styles from './AddTask.module.scss';
import { AddIcon } from "@/assets/icons/AddIcon"
import { AddTaskGroup } from "./AddTaskGroup"

export const AddTaskLabels = () => {
    return(
        <AddTaskGroup header={'Labels'}>
            <button className={styles['add-item']}>
                <AddIcon />
            </button>
        </AddTaskGroup>
    )
}