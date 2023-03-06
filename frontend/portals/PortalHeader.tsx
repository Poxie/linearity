import { CloseIcon } from '@/assets/icons/CloseIcon';
import { usePortal } from '@/contexts/portal';
import { HasTooltip } from '@/contexts/tooltip/HasTooltip';
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
                <HasTooltip tooltip={'Close'} position={'bottom'}>
                    <button onClick={close} aria-label={'Close'}>
                        <CloseIcon />
                    </button>
                </HasTooltip>
            </div>
            {subHeader && (
                <span className={styles['header-sub']}>
                    {subHeader}
                </span>
            )}
        </div>
    )
}