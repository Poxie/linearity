"use client";

import styles from './SettingsInvites.module.scss';
import { InviteIcon } from "@/assets/icons/InviteIcon";
import { useAuth } from "@/contexts/auth";
import { ModalGroup } from "@/modals/ModalGroup";
import { Invite } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { Input } from '../input';
import { SearchIcon } from '@/assets/icons/SearchIcon';
import Button from '../button';
import { CloseIcon } from '@/assets/icons/CloseIcon';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { selectTeamInvites } from '@/redux/teams/selectors';
import { setInvites } from '@/redux/teams/actions';

const PLACEHOLDER_AMOUNT = 4;
export const SettingsInvites = ({
    params: { teamId }
}: {
    params: { teamId: string };
}) => {
    const { get } = useAuth();
    const dispatch = useAppDispatch();

    const invites = useAppSelector(state => selectTeamInvites(state, parseInt(teamId)));
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        if(invites.length) return setLoading(false);

        get<Invite[]>(`/teams/${teamId}/invites`)
            .then(invites => {
                dispatch(setInvites(parseInt(teamId), invites));
                setLoading(false);
            });
    }, [invites.length]);

    const filteredInvites = useMemo(() => (
        invites.filter(invite => 
            invite.user.name.toLowerCase().includes(search.toLowerCase()) || 
            invite.user.username.toLowerCase().includes(search.toLowerCase())
        )
    ), [search, invites])
    return(
        <div className={styles['container']}>
            <ModalGroup header={'Invites'} icon={<InviteIcon />}>
                <Input 
                    placeholder={'Search for invite'}
                    icon={<SearchIcon />}
                    onChange={setSearch}
                    containerClassName={styles['input']}
                />
                {!loading && (
                    <div className={styles['list-header']}>
                        <span>
                            Invites — {filteredInvites.length}
                        </span>
                        <span>
                            Role
                        </span>
                        <span>
                            Invited by
                        </span>
                        <span>
                            Invited at
                        </span>
                        <span>
                            Status
                        </span>
                    </div>
                )}
                {!loading && !filteredInvites.length && (
                    <span className={styles['empty']}>
                        No invites found
                    </span>
                )}
                <ul className={styles['list']}>
                    {loading && Array.from(Array(PLACEHOLDER_AMOUNT)).map((_,key) => (
                        <li className={styles['item-placeholder']} aria-hidden="true" />
                    ))}
                    {filteredInvites.map(invite => {
                        const statusClassName = [
                            styles['status'],
                            styles[invite.status]
                        ].join(' ');
                        return(
                            <li key={invite.user.id} className={styles['item']}>
                                <div className={styles['main']}>
                                    <div className={styles['icon']}>
                                        {invite.user.name[0]}
                                    </div>
                                    <span>
                                        {invite.user.name}
                                    </span>
                                </div>
                                <span>
                                    {invite.role.slice(0,1).toUpperCase() + invite.role.slice(1)}
                                </span>
                                <span>
                                    {invite.sender.name}
                                </span>
                                <span>
                                    {new Date(invite.created_at * 1000).toLocaleString('en', { dateStyle: 'medium', timeStyle: 'short' })}
                                </span>
                                <div className={styles['main']}>
                                    <span 
                                        className={statusClassName}
                                    >
                                        {invite.status.slice(0, 1).toUpperCase() + invite.status.slice(1)}
                                    </span>
                                </div>
                                <div className={styles['buttons']}>
                                    {invite.status === 'pending' && (
                                        <Button>
                                            <CloseIcon />
                                        </Button>
                                    )}
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </ModalGroup>
        </div>
    )
}