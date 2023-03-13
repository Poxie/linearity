import styles from './Sidebar.module.scss';
import { useAppSelector } from "@/redux/store"
import { selectTeams, selectTeamsLoading } from "@/redux/teams/selectors"
import { SidebarGroup } from "./SidebarGroup"
import Link from 'next/link';
import Button from '../button';
import { AddIcon } from '@/assets/icons/AddIcon';
import { useModal } from '@/contexts/modal';
import { AddTeamModal } from '@/modals/add-team';

export const SidebarTeams = () => {
    const { setModal } = useModal();
    const teams = useAppSelector(selectTeams);
    const loading = useAppSelector(selectTeamsLoading);

    const openModal = () => setModal(<AddTeamModal />);

    return(
        <SidebarGroup header={'My teams'}>
            <ul className={styles['list']}>
                {teams.map(team => (
                    <li className={styles['list-item']} key={team.id}>
                        <Link href={`/teams/${team.id}/groups/${team.primary_group_id}`}>
                            {team.name}
                        </Link>
                    </li>
                ))}

                {loading && Array.from(Array(4)).map((_,key) => (
                    <li key={key} className={styles['list-item-loading']} aria-hidden="true" />
                ))}
            </ul>

            {!loading && (
                <Button 
                    type={'hollow'} 
                    icon={<AddIcon />}
                    className={styles['add-team-button']}
                    onClick={openModal}
                >
                    Add Team
                </Button>
            )}
        </SidebarGroup>
    )
}