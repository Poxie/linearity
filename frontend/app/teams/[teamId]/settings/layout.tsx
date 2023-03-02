import { SettingsSidebar } from '@/components/settings-sidebar';
import { ReactNode } from 'react';
import styles from './page.module.scss';

export default function SettingsLayout({
    children,
    params: { teamId }
}: {
    children: ReactNode;
    params: { teamId: string };
}) {
    return(
        <div className={styles['container']}>
            <SettingsSidebar teamId={parseInt(teamId)} />
            {children}
        </div>
    )
}