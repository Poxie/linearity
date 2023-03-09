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
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { selectTeamFetchedInvites, selectTeamInvites } from '@/redux/teams/selectors';
import { setInvites } from '@/redux/teams/actions';
import { useModal } from '@/contexts/modal';
import { AddMemberModal } from '@/modals/add-member/AddMemberModal';
import { SettingsInvite } from './SettingsInvite';
import { useRouter } from 'next/router';

const PLACEHOLDER_AMOUNT = 4;
export const SettingsInvites = () => {
    const { get, patch } = useAuth();
    const { setModal } = useModal();
    const dispatch = useAppDispatch();

    const teamId = useRouter().query.teamId as string;
    const fetchedInvites = useAppSelector(state => selectTeamFetchedInvites(state, parseInt(teamId)));
    const invites = useAppSelector(state => selectTeamInvites(state, parseInt(teamId)));
    const [loading, setLoading] = useState(!fetchedInvites);
    const [search, setSearch] = useState('');

    useEffect(() => {
        if(fetchedInvites) return setLoading(false);

        get<Invite[]>(`/teams/${teamId}/invites`)
            .then(invites => {
                dispatch(setInvites(parseInt(teamId), invites));
                setLoading(false);
            });
    }, [fetchedInvites]);

    const openModal = () => setModal(<AddMemberModal teamId={parseInt(teamId)} />);

    const filteredInvites = useMemo(() => (
        invites.filter(invite => 
            invite.user.name.toLowerCase().includes(search.toLowerCase()) || 
            invite.user.username.toLowerCase().includes(search.toLowerCase())
        )
    ), [search, invites])
    return(
        <div className={styles['container']}>
            <ModalGroup header={'Invites'} icon={<InviteIcon />}>
                <div className={styles['header']}>
                    <Input 
                        placeholder={'Search for invite'}
                        icon={<SearchIcon />}
                        onChange={setSearch}
                        containerClassName={styles['input']}
                    />
                    <Button 
                        className={styles['header-button']}
                        onClick={openModal}
                    >
                        Send invite
                    </Button>
                </div>
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
                        <li className={styles['item-placeholder']} aria-hidden="true" key={key} />
                    ))}
                    {fetchedInvites && filteredInvites.map(invite => (
                        <SettingsInvite 
                            invite={invite}
                            key={invite.id}
                        />
                    ))}
                </ul>
            </ModalGroup>
        </div>
    )
}