import { GearIcon } from '@/assets/icons/GearIcon';
import { SearchIcon } from '@/assets/icons/SearchIcon';
import { useAppSelector } from '@/redux/store';
import { selectTeamById, selectTeams } from '@/redux/teams/selectors';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Dropdown } from '../dropdown';
import { Input } from '../input';
import styles from './TeamHeader.module.scss';

export const TeamHeader: React.FC<{
    teamId: number;
}> = ({ teamId }) => {
    const { push } = useRouter();

    const teams = useAppSelector(selectTeams);
    const team = useAppSelector(state => selectTeamById(state, teamId));

    if(!teams.length) return null;

    const goToTeam = (id: number) => {
        const team = teams.find(team => team.id === id);
        push(`/teams/${id}/groups/${team?.primary_group_id}`);
    }
    
    const dropdownItems = teams.map(team => ({
        text: team.name,
        id: team.id
    }))
    return(
        <div className={styles['header']}>
            <div className={styles['header-content']}>
                <Dropdown 
                    items={dropdownItems}
                    onChange={goToTeam}
                />
                <Input 
                    containerClassName={styles['input']}
                    placeholder={`Search in ${team?.name}`}
                    icon={<SearchIcon />}
                />
            </div>
            <div className={styles['header-content']}>
                <Link 
                    href={`/teams/${teamId}/settings`}
                    className={styles['tab']}
                >
                    <GearIcon />
                </Link>
            </div>
        </div>
    )
}