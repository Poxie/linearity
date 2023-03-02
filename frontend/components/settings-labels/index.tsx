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
import Button from '../button';
import { useModal } from '@/contexts/modal';
import { AddLabelModal } from '@/modals/add-label/AddLabelModal';

export const SettingsLabels: React.FC<{
    params: { teamId: string };
}> = ({ params: { teamId } }) => {
    const { setModal } = useModal();

    const labels = useAppSelector(state => selectTeamLabels(state, parseInt(teamId)));
    const [search, setSearch] = useState('');

    const openModal = () => setModal(<AddLabelModal teamId={parseInt(teamId)} />);

    const filteredLabels = labels.filter(label => label.name.toLowerCase().includes(search.toLowerCase()));
    return(
        <div className={styles['container']}>
            <ModalGroup header={'Labels'} icon={<LabelIcon />}>
                <div className={styles['header']}>
                    <Input 
                        placeholder={'Search for label'}
                        inputClassName={styles['input']}
                        containerClassName={styles['input-container']}
                        onChange={setSearch}
                        name={'label-search'}
                        icon={<SearchIcon />}
                    />
                    <Button 
                        className={styles['button']}
                        onClick={openModal}
                    >
                        Create label
                    </Button>
                </div>

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