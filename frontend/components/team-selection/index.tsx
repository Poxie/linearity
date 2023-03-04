"use client";

import { AddIcon } from '@/assets/icons/AddIcon';
import { InboxIcon } from '@/assets/icons/InboxIcon';
import { useAppSelector } from '@/redux/store';
import { selectTeams, selectTeamsLoading } from '@/redux/teams/selectors';
import Button from '../button';
import styles from './TeamSelection.module.scss';
import { TeamSelectionInbox } from './TeamSelectionInbox';
import { TeamSelectionItem } from './TeamSelectionItem';

const PLACEHOLDER_AMOUNT = 4;
export const TeamSelection = () => {
    const teams = useAppSelector(selectTeams);
    const loading = useAppSelector(selectTeamsLoading);

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

                    {loading && Array.from(Array(PLACEHOLDER_AMOUNT)).map((_,key) => (
                        <div 
                            className={styles['item-loading']} 
                            aria-hidden="true"
                            key={key}
                        >
                            <div />
                            <div />
                            <div />
                        </div>
                    ))}
                </ul>
            </div>
            {!loading && (
                <div className={styles['footer']}>
                    <Button
                        icon={<AddIcon />}
                        className={styles['footer-button']}
                    >
                        Add Team
                    </Button>
                    <TeamSelectionInbox />
                </div>
            )}
        </div>
    )
}