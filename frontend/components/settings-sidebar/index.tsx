"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './SettingsSidebar.module.scss';

const TABS = [
    { text: 'Overview', path: '' },
    { text: 'Labels', path: '/labels' },
    { text: 'Members', path: '/members' }
]
export const SettingsSidebar: React.FC<{
    teamId: number;
}> = ({ teamId }) => {
    const pathname = usePathname();
    return(
        <ul className={styles['container']}>
            {TABS.map(tab => {
                const path = `/teams/${teamId}/settings${tab.path}`;

                const active = (pathname?.startsWith(path) && tab.path) || (path === pathname);
                const className = [
                    styles['tab'],
                    active ? styles['active'] : ''
                ].join(' ');
                return(
                    <li key={tab.path}>
                        <Link 
                            href={`/teams/${teamId}/settings${tab.path}`}
                            className={className}
                        >
                            {tab.text}
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}