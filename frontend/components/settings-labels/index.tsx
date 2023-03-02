"use client";

import styles from './SettingsLabels.module.scss';
import { LabelIcon } from "@/assets/icons/LabelIcon"
import { ModalGroup } from "@/modals/ModalGroup"
import { Input } from '../input';
import { SearchIcon } from '@/assets/icons/SearchIcon';
import { useAppSelector } from '@/redux/store';
import { selectTeamLabels } from '@/redux/teams/selectors';
import { LabelList } from '../label-list/LabelList';
import { useState } from 'react';

export const SettingsLabels: React.FC<{
    params: { teamId: string };
}> = ({ params: { teamId } }) => {
    const labels = useAppSelector(state => selectTeamLabels(state, parseInt(teamId)));
    const [search, setSearch] = useState('');

    const filteredLabels = labels.filter(label => label.name.toLowerCase().includes(search.toLowerCase()));
    return(
        <div className={styles['container']}>
            <ModalGroup header={'Labels'} icon={<LabelIcon />}>
                <Input 
                    placeholder={'Search for label'}
                    inputClassName={styles['input']}
                    containerClassName={styles['input-container']}
                    onChange={setSearch}
                    name={'label-search'}
                    icon={<SearchIcon />}
                />

                {!filteredLabels.length && (
                    <span className={styles['empty']}>	
                        No labels found
                    </span>
                )}

                <ul className={styles['list']}>
                    {filteredLabels.map(label => (
                        <li className={styles['list-item']} key={label.id}>
                            <div 
                                className={styles['list-item-dot']}
                                style={label.color ? {
                                    backgroundColor: label.color
                                } : undefined}
                            />
                            {label.name}
                        </li>
                    ))}
                </ul>
            </ModalGroup>
        </div>
    )
}