import Button from '../components/button';
import styles from './Modals.module.scss';

export const ModalFooter: React.FC<{
    confirmLabel: string;
    onConfirm: () => void;
    cancelLabel: string;
    onCancel: () => void;
    confirmLoading?: boolean;
    confirmLoadingLabel?: string;
    confirmDisabled?: boolean;
    cancelDisabled?: boolean;
}> = ({ confirmLabel, onConfirm, cancelLabel, onCancel, confirmLoadingLabel='Loading...', confirmLoading=false, confirmDisabled=false, cancelDisabled=false }) => {
    return(
        <div className={styles['footer']}>
            <Button 
                onClick={onCancel}
                type={'transparent'}
                disabled={cancelDisabled}
            >
                {cancelLabel}
            </Button>
            <Button
                onClick={onConfirm}
                disabled={confirmDisabled || confirmLoading}
            >
                {!confirmLoading ? confirmLabel : confirmLoadingLabel}
            </Button>
        </div>
    )
}