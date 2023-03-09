import styles from './TeamSettingsLayout.module.scss';
import { SettingsSidebar } from '@/components/settings-sidebar';
import { ReactNode } from 'react';
import { useRouter } from 'next/router';

export default function TeamSettingsLayout({
    children,
}: {
    children: ReactNode;
}) {
    const teamId = useRouter().query.teamId as string;
    return(
        <div className={styles['container']}>
            <SettingsSidebar teamId={parseInt(teamId)} />
            <div className={styles['content']}>
                {children}
            </div>
        </div>
    )
}