"use client";

import styles from '../../app/teams/[teamId]/page.module.scss';
import { useAppSelector } from "@/redux/store"
import { selectTeamGroups, selectTeams } from "@/redux/teams/selectors"
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AddIcon } from '@/assets/icons/AddIcon';

export const GroupSelector: React.FC<{
    teamId: number;
}> = ({ teamId }) => {
    const groups = useAppSelector(state => selectTeamGroups(state, teamId));
    const pathname = usePathname();
    const activeId = parseInt(pathname?.split('/').at(-1) || '0');

    return(
        <div className={styles['group-selector']}>
            <ul className={styles['group-list']}>
                {groups?.map(group => {
                    const className = [
                        styles['group-item'], 
                        group.id === activeId ? styles['active'] : ''
                    ].join(' ');

                    return(
                        <li key={group.id}>
                            <Link 
                                href={`/teams/${teamId}/groups/${group.id}`}
                                className={className}
                            >
                                {group.name}
                            </Link>
                        </li>
                    )
                })}
            </ul>
            <button
                onClick={() => {}}
                aria-label={'Create group'}
                className={styles['create-group-button']}
            >
                <AddIcon />
            </button>
        </div>
    )
}