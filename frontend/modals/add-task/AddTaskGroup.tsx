import styles from './AddTask.module.scss';

export const AddTaskGroup: React.FC<{
    children: any;
    header: string;
}> = ({ header, children }) => {
    return(
        <div className={styles['group']}>
            <span className={styles['group-header']}>
                {header}
            </span>
            {children}
        </div>
    )
}