"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './SettingsSidebar.module.scss';

const TABS = [
    { text: 'Overview', path: '' },
    { text: 'Labels', path: '/labels' }
]
export const SettingsSidebar: React.FC<{
    teamId: number;
}> = ({ teamId }) => {
    const pathname = usePathname();
    return(
        <ul className={styles['container']}>
            {TABS.map(tab => {
                const path = `/teams/${teamId}/settings${tab.path}`;

                const className = [
                    styles['tab'],
                    path === pathname ? styles['active'] : ''
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