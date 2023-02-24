import { SearchIcon } from '@/assets/icons/SearchIcon';
import { useAppSelector } from '@/redux/store';
import { selectTeamById, selectTeams } from '@/redux/teams/selectors';
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

    const goToTeam = (id: number) => push(`/teams/${id}`);
    
    const dropdownItems = teams.map(team => ({
        text: team.name,
        id: team.id
    }))
    return(
        <div className={styles['header']}>
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
    )
}