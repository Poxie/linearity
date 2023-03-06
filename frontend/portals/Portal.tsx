import styles from './Portal.module.scss';
import { PortalHeader } from './PortalHeader';

export const Portal: React.FC<{
    header: string;
    subHeader?: string;
    children: any;
}> = ({ header, subHeader, children }) => {
    return(
        <div className={styles['portal']}>
            <PortalHeader 
                header={header} 
                subHeader={subHeader} 
            />
            {children}
        </div>
    )
}