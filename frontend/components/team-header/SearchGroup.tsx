import styles from './TeamHeader.module.scss';

export const SearchGroup: React.FC<{
    header: string;
    children: any;
}> = ({ header, children }) => {
    return(
        <div className={styles['search-group']}>
            <span className={styles['search-group-header']}>
                {header}
            </span>
            {children}
        </div>
    )
}