import styles from './Profiles.module.scss';

export const ProfileGroup: React.FC<{
    header: string;
    children: any;
}> = ({ header, children }) => {
    return(
        <div>
            <div className={styles['group-header']}>
                <span>
                    {header}
                </span>
            </div>
            {children}
        </div>
    )
}