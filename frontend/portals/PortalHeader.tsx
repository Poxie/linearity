import { CloseIcon } from '@/assets/icons/CloseIcon';
import { usePortal } from '@/contexts/portal';
import styles from './Portal.module.scss';

export const PortalHeader: React.FC<{
    header: string;
    subHeader?: string;
}> = ({ header, subHeader }) => {
    const { close } = usePortal();

    return(
        <div className={styles['header']}>
            <div className={styles['header-main']}>
                <span>
                    {header}
                </span>
                <button onClick={close}>
                    <CloseIcon />
                </button>
            </div>
            {subHeader && (
                <span className={styles['header-sub']}>
                    {subHeader}
                </span>
            )}
        </div>
    )
}