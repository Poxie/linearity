"use client";

import styles from '../../app/teams/[teamId]/page.module.scss';
import { useAppSelector } from "@/redux/store"
import { selectTeamGroups, selectTeams } from "@/redux/teams/selectors"
import Link from 'next/link';

export const GroupSelector: React.FC<{
    teamId: number;
}> = ({ teamId }) => {
    const groups = useAppSelector(state => selectTeamGroups(state, teamId));

    return(
        <ul className={styles['group-selector']}>
            {groups?.map(group => (
                <li>
                    <Link href={`/teams/${teamId}/groups/${group.id}`}>
                        {group.name}
                    </Link>
                </li>
            ))}
        </ul>
    )
}