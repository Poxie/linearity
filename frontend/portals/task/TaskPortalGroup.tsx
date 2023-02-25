import styles from './TaskPortal.module.scss';

export const TaskPortalGroup: React.FC<{
    header: string;
    children: any;
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