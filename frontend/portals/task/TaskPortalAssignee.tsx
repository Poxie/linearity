import styles from './TaskPortal.module.scss';

export const TaskPortalAssignee: React.FC<{
    icon: any;
    text: string;
    className?: string;
}> = ({ icon, text, className }) => {
    className = [
        className,
        styles['assignee']
    ].join(' ');
    return(
        <li>
            <button className={className}>
                <span className={styles['assignee-icon']}>
                    {icon}
                </span>
                <span className={styles['assignee-text']}>
                    {text}
                </span>
            </button>
        </li>
    )
}