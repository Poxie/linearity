import { useAppSelector } from '@/redux/store';
import { selectTaskLabels } from '@/redux/teams/selectors';
import styles from './Group.module.scss';
import { useTask } from './GroupTask';

export const GroupTaskLabels = () => {
    const { taskId } = useTask();
    const labels = useAppSelector(state => selectTaskLabels(state, taskId));
    if(!labels?.length) return null;

    return(
        <ul className={styles['task-labels']}>
            {labels?.map(label => (
                <li 
                    style={{
                        backgroundColor: label.color || 'var(--background-quinary)',
                        borderColor: label.color || 'var(--background-quinary)'
                    }}
                    className={styles['task-label']}
                    key={label.id}
                >
                    {label.name}
                </li>
            ))}
        </ul>
    )
}