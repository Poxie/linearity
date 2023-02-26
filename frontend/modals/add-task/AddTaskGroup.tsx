import styles from './AddTask.module.scss';

export const AddTaskGroup: React.FC<{
    children: any;
    header: string;
    className?: string;
}> = ({ header, className, children }) => {
    return(
        <div className={styles['group']}>
            <span className={styles['group-header']}>
                {header}
            </span>
            <div className={className}>
                {children}
            </div>
        </div>
    )
}