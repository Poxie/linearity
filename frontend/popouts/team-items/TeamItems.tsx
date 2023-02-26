import styles from './TeamItems.module.scss';
import { Input } from "@/components/input";
import { useAppSelector } from "@/redux/store";
import { selectTeamLabels, selectTeamMembers } from "@/redux/teams/selectors";
import { useCallback, useMemo, useState } from 'react';
import { Label, Member } from '@/types';
import { usePopout } from '@/contexts/popout';
import { TeamItemsMembers } from './TeamItemsMembers';
import { TeamItemsLabels } from './TeamItemsLabels';

export const TeamItems: React.FC<{
    teamId: number;
    type: 'members' | 'labels';
    onSelect?: (item: Member | Label) => void;
    closeOnSelect?: boolean;
}> = ({ teamId, type, onSelect, closeOnSelect }) => {
    const { close } = usePopout();
    const items = useAppSelector(state => (
        type === 'members' ? selectTeamMembers(state, teamId) : selectTeamLabels(state, teamId)
    ));
    const [search, setSearch] = useState('');

    const filteredItems = useMemo(() => (
        (items as {name: string}[]).filter(item => item.name.toLowerCase().includes(search))
    ), [items, search])

    const handleSelect = useCallback((item: Member | Label) => {
        if(onSelect) onSelect(item);
        if(closeOnSelect) close();
    }, [onSelect, closeOnSelect]);

    return(
        <>
            <Input 
                placeholder={'Search'} 
                inputClassName={styles['input']}
                onChange={setSearch}
            />
            {filteredItems.length !== 0 && type === 'members' && (
                <TeamItemsMembers 
                    members={filteredItems as Member[]}
                    handleSelect={handleSelect}
                />
            )}
            {filteredItems.length !== 0 && type === 'labels' && (
                <TeamItemsLabels 
                    labels={filteredItems as Label[]}
                    handleSelect={handleSelect}
                />
            )}
            {filteredItems.length === 0 && (
                <span  className={styles['empty']}>
                    No {type} found.
                </span>
            )}
        </>
    )
}