import { ReactElement } from 'react';
import styles from './Modals.module.scss';

export const ModalGroup: React.FC<{
    header: string;
    icon: ReactElement;
    children: any;
    className?: string;
}> = ({ icon, header, children, className }) => {
    return(
        <div className={styles['group']}>
            <div className={styles['group-header']}>
                {icon}
                {header}
            </div>
            
            <div className={className}>
                {children}
            </div>
        </div>
    )
}