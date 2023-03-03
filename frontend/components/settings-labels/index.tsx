"use client";

import styles from './SettingsLabels.module.scss';
import { LabelIcon } from "@/assets/icons/LabelIcon"
import { ModalGroup } from "@/modals/ModalGroup"
import { Input } from '../input';
import { SearchIcon } from '@/assets/icons/SearchIcon';
import { useAppSelector } from '@/redux/store';
import { selectTeamLabels } from '@/redux/teams/selectors';
import { useState } from 'react';
import Button from '../button';
import { useModal } from '@/contexts/modal';
import { AddLabelModal } from '@/modals/add-label/AddLabelModal';
import { useTeam } from '@/hooks/useTeam';
import { TrashIcon } from '@/assets/icons/TrashIcon';
import { EditIcon } from '@/assets/icons/EditIcon';
import { Label } from '@/types';
import Link from 'next/link';

export const SettingsLabels: React.FC<{
    params: { teamId: string };
}> = ({ params: { teamId } }) => {
    const { setModal } = useModal();
    const { removeLabel } = useTeam(parseInt(teamId));

    const labels = useAppSelector(state => selectTeamLabels(state, parseInt(teamId)));
    const [search, setSearch] = useState('');

    const openModal = () => setModal(<AddLabelModal teamId={parseInt(teamId)} />);
    const editLabel = (label: Label) => setModal(<AddLabelModal teamId={parseInt(teamId)} label={label} />)

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

                <div className={styles['list-container']}>
                    <div className={styles['list-header']}>
                        <span>
                            Labels — {filteredLabels.length}
                        </span>
                        <span>
                            Issues with label
                        </span>
                    </div>

                    {!filteredLabels.length && (
                        <span className={styles['empty']}>	
                            No labels found
                        </span>
                    )}
                    
                    <ul className={styles['list']}>
                        {filteredLabels.map(label => (
                            <li className={styles['list-item']} key={label.id}>
                                <div className={styles['list-item-main']}>
                                    <div 
                                        className={styles['list-item-dot']}
                                        style={label.color ? {
                                            backgroundColor: label.color
                                        } : undefined}
                                    />
                                    {label.name}
                                </div>
                                <Link 
                                    className={styles['item-task-count']}
                                    href={`/teams/${teamId}/settings/labels/${label.id}`}
                                >
                                    {label.task_count}
                                    {' '}
                                    issues
                                </Link>
                                <div className={styles['item-buttons']}>
                                    <Button 
                                        onClick={() => editLabel(label)}
                                        icon={<EditIcon />}
                                        ariaLabel={'Edit label'}
                                    >

                                    </Button>
                                    <Button 
                                        onClick={() => removeLabel(label)} 
                                        icon={<TrashIcon />}
                                        ariaLabel={'Delete label'}
                                    >

                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </ModalGroup>
        </div>
    )
}