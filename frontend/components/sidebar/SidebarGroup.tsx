import styles from './Sidebar.module.scss';

export const SidebarGroup: React.FC<{
    header: string;
    children: any;
}> = ({ header, children }) => {
    return(
        <div className={styles['group']}>
            <button className={styles['group-header']}>
                {header}
            </button>
            {children}
        </div>
    )
}