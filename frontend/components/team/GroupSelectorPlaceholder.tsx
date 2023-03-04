import styles from './Team.module.scss';

export const GroupSelectorPlaceholder = () => {
    return(
        <div className={styles['group-selector-placeholder']} aria-hidden="true">
            <div className={styles['selector-item-placeholder']} />
            <div className={styles['selector-item-placeholder']} />
            <div className={styles['selector-item-placeholder']} />
        </div>
    )
}