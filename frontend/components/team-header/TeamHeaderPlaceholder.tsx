import styles from './TeamHeader.module.scss';

export const TeamHeaderPlaceholder = () => {
    return(
        <div className={styles['placeholder']} aria-hidden="true">
            <div className={styles['placeholder-main']}>
                <div className={styles['placeholder-selector']} />
                <div className={styles['placeholder-input']} />
            </div>
            <div className={styles['placeholder-tab']} />
        </div>
    )
}