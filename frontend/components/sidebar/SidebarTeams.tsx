import styles from './Sidebar.module.scss';
import { useAppSelector } from "@/redux/store"
import { selectTeams, selectTeamsLoading } from "@/redux/teams/selectors"
import { SidebarGroup } from "./SidebarGroup"
import Link from 'next/link';
import Button from '../button';
import { AddIcon } from '@/assets/icons/AddIcon';

export const SidebarTeams = () => {
    const teams = useAppSelector(selectTeams);
    const loading = useAppSelector(selectTeamsLoading);

    return(
        <SidebarGroup header={'My teams'}>
            <ul className={styles['list']}>
                {teams.map(team => (
                    <li className={styles['list-item']} key={team.id}>
                        <Link href={`/t/${team.id}`}>
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
                >
                    Add Team
                </Button>
            )}
        </SidebarGroup>
    )
}