import styles from './Modals.module.scss';

export const ModalHeader: React.FC<{
    children: any;
    subHeader?: string;
}> = ({ children, subHeader }) => {
    return(
        <div className={styles['header']}>
            <h2>
                {children}
            </h2>
            {subHeader && (
                <span>
                    {subHeader}
                </span>
            )}
        </div>
    )
}