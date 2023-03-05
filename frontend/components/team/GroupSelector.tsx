"use client";

import styles from './Team.module.scss';
import { useAppSelector } from "@/redux/store"
import { selectTeamDataLoaded, selectTeamGroups, selectTeams } from "@/redux/teams/selectors"
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AddIcon } from '@/assets/icons/AddIcon';
import { GroupSelectorPlaceholder } from './GroupSelectorPlaceholder';
import { HasTooltip } from '@/contexts/tooltip/HasTooltip';
import { useModal } from '@/contexts/modal';
import { AddGroupModal } from '@/modals/add-group/AddGroupModal';

export const GroupSelector: React.FC<{
    teamId: number;
}> = ({ teamId }) => {
    const { setModal } = useModal();

    const pathname = usePathname();
    const activeId = parseInt(pathname?.split('/').at(-1) || '0');

    const hasGroupsFetched = useAppSelector(state => selectTeamDataLoaded(state, teamId));
    const groups = useAppSelector(state => selectTeamGroups(state, teamId));

    if(!hasGroupsFetched) return  <GroupSelectorPlaceholder />;

    const openModal = () => setModal(<AddGroupModal teamId={teamId} />);

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
            <HasTooltip tooltip={'Create group'}>
                <button
                    onClick={openModal}
                    aria-label={'Create group'}
                    className={styles['create-group-button']}
                >
                    <AddIcon />
                </button>
            </HasTooltip>
        </div>
    )
}