import { UserSettingsSidebar } from '@/components/user-settings-sidebar';
import styles from './UserSettingsLayout.module.scss';

export default function UserSettingsLayout({
    children
}: {
    children: any;
}) {
    return(
        <div className={styles['container']}>
            <UserSettingsSidebar />
            {children}
        </div>
    )
}