"use client";

import { MemberIcon } from '@/assets/icons/MemberIcon';
import { ModalGroup } from '@/modals/ModalGroup';
import { useAppSelector } from '@/redux/store';
import { selectTeamMembers } from '@/redux/teams/selectors';
import { useState } from 'react';
import { Input } from '../input';
import styles from './SettingsMembers.module.scss';

export const SettingsMembers: React.FC<{
    params: { teamId: string };
}> = ({ params: { teamId } }) => {
    const members = useAppSelector(state => selectTeamMembers(state, parseInt(teamId)));

    const [search, setSearch] = useState('');
    
    const filteredMembers = members.filter(member => member.name.toLowerCase().includes(search.toLowerCase()));
    return(
        <div className={styles['container']}>
            <ModalGroup header={'Members'} icon={<MemberIcon />}>
                <Input 
                    placeholder={'Search for member'}
                    onChange={setSearch}
                />
                <div className={styles['list-header']}>
                    <span>
                        Members — {members.length}
                    </span>
                    <span>
                        Active Issues
                    </span>
                    <span>
                        Role
                    </span>
                </div>
                {filteredMembers.length === 0 && (
                    <span className={styles['empty']}>
                        No members found
                    </span>
                )}
                <ul className={styles['list']}>
                    {filteredMembers.map(member => (
                        <li key={member.id} className={styles['list-item']}>
                            <div className={styles['list-item-main']}>
                                <div className={styles['member-icon']}>
                                    {member.name[0]}
                                </div>
                                <span>
                                    {member.name}
                                </span>
                            </div>
                            <span>
                                {member.task_count} issues
                            </span>
                            <span>
                                {member.role.slice(0,1).toUpperCase() + member.role.slice(1)}
                            </span>
                        </li>
                    ))}
                </ul>
            </ModalGroup>
        </div>
    )
}