"use client";

import { AddIcon } from '@/assets/icons/AddIcon';
import { useAppSelector } from '@/redux/store';
import { selectTeams } from '@/redux/teams/selectors';
import Button from '../button';
import styles from './TeamSelection.module.scss';
import { TeamSelectionItem } from './TeamSelectionItem';

export const TeamSelection = () => {
    const teams = useAppSelector(selectTeams);

    return(
        <div className={styles['container']}>
            <h1 className={styles['header']}>
                Your teams
            </h1>

            <div className={styles['list']}>
                <div className={styles['item']}>
                    <span>
                        Name
                    </span>
                    <span>
                        Members
                    </span>
                    <span>
                        Issues
                    </span>
                </div>
                <ul>
                    {teams.map(team => (
                        <TeamSelectionItem team={team} key={team.id} />
                    ))}
                </ul>
            </div>
            <div className={styles['footer']}>
                <Button
                    icon={<AddIcon />}
                    className={styles['footer-button']}
                >
                    Add Team
                </Button>
            </div>
        </div>
    )
}