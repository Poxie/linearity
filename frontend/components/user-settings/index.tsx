import styles from './UserSettings.module.scss';
import { UserSettingsHeader } from './UserSettingsHeader';

export const UserSettings = () => {
    return(
        <div className={styles['container']}>
            <UserSettingsHeader />
        </div>
    )
}