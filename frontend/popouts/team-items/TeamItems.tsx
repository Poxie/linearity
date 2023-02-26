import styles from './TeamItems.module.scss';
import { Input } from "@/components/input";
import { useAppSelector } from "@/redux/store";
import { selectTeamMembers } from "@/redux/teams/selectors";
import { useCallback, useMemo, useState } from 'react';
import { Member } from '@/types';
import { usePopout } from '@/contexts/popout';

export const TeamItems: React.FC<{
    teamId: number;
    type: 'members' | 'labels';
    onSelect?: (item: Member) => void;
    closeOnSelect?: boolean;
}> = ({ teamId, type, onSelect, closeOnSelect }) => {
    const { close } = usePopout();
    const members = useAppSelector(state => selectTeamMembers(state, teamId));
    const [search, setSearch] = useState('');

    const filteredMembers = useMemo(() => (
        members.filter(member => member.name.toLowerCase().includes(search.toLowerCase()))
    ), [members, search]);

    const handleSelect = useCallback((member: Member) => {
        if(onSelect) onSelect(member);
        if(closeOnSelect) close();
    }, [onSelect, closeOnSelect]);

    return(
        <>
            <Input 
                placeholder={'Search'} 
                inputClassName={styles['input']}
                onChange={setSearch}
            />
            {filteredMembers.length !== 0 && (
                <ul className={styles['member-items']}>
                    {filteredMembers.map(member => (
                        <li key={member.id}>
                            <button 
                                className={styles['member-item']}
                                onClick={() => handleSelect(member)}
                            >
                                <span className={styles['member-icon']}>
                                    {member.name[0]}
                                </span>
                                {member.name}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            {filteredMembers.length === 0 && (
                <span  className={styles['empty']}>
                    No members found.
                </span>
            )}
        </>
    )
}