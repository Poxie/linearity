import { UserSettingsSidebar } from '@/components/user-settings-sidebar';
import styles from './page.module.scss';

export default function SettingsLayout({
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