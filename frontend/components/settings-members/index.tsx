import { MemberIcon } from '@/assets/icons/MemberIcon';
import { SearchIcon } from '@/assets/icons/SearchIcon';
import { useModal } from '@/contexts/modal';
import { AddMemberModal } from '@/modals/add-member/AddMemberModal';
import { ModalGroup } from '@/modals/ModalGroup';
import { useAppSelector } from '@/redux/store';
import { selectTeamMembers } from '@/redux/teams/selectors';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import Button from '../button';
import { Input } from '../input';
import { UserAvatar } from '../user-avatar';
import styles from './SettingsMembers.module.scss';

export const SettingsMembers = () => {
    const { setModal } = useModal();
    const teamId = useRouter().query.teamId as string;
    const members = useAppSelector(state => selectTeamMembers(state, parseInt(teamId)));

    const [search, setSearch] = useState('');

    const openModal = () => setModal(<AddMemberModal teamId={parseInt(teamId)} />)
    
    const filteredMembers = useMemo(() => (
        members.filter(member => member.name.toLowerCase().includes(search.toLowerCase()))
    ), [search, members]);
    return(
        <div className={styles['container']}>
            <ModalGroup header={'Members'} icon={<MemberIcon />}>
                <div className={styles['header']}>
                    <Input 
                        placeholder={'Search for member'}
                        icon={<SearchIcon />}
                        onChange={setSearch}
                        inputClassName={styles['input']}
                        containerClassName={styles['input-container']}
                    />
                    <Button 
                        className={styles['add-button']}
                        onClick={openModal}
                    >
                        Add member
                    </Button>
                </div>
                <div className={styles['list-header']}>
                    <span>
                        Members — {filteredMembers.length}
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
                                <UserAvatar 
                                    className={styles['item-avatar']}
                                    avatar={member.avatar}
                                    name={member.name}
                                />
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