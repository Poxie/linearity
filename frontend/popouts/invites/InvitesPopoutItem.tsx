import styles from './InvitesPopout.module.scss';
import { InboxInvite, Team } from "@/types"
import { HasTooltip } from '@/contexts/tooltip/HasTooltip';
import Button from '@/components/button';
import { CloseIcon } from '@/assets/icons/CloseIcon';
import { CheckmarkIcon } from '@/assets/icons/CheckmarkIcon';
import { useAuth } from '@/contexts/auth';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setUserInviteStatus } from '@/redux/user/actions';
import { addTeam } from '@/redux/teams/actions';
import { selectUser } from '@/redux/user/selectors';
import { usePopout } from '@/contexts/popout';

export const InvitesPopoutItem: React.FC<{
    invite: InboxInvite;
}> = ({ invite }) => {
    const { close } = usePopout();
    const { get, put, patch } = useAuth();
    const dispatch = useAppDispatch();

    const user = useAppSelector(selectUser);

    const rejectInvite = (teamId: number, inviteId: number) => {
        dispatch(setUserInviteStatus(inviteId, 'rejected'));
        patch(`/teams/${teamId}/invites/${inviteId}`, {
            status: 'rejected'
        }).catch(() => {
            dispatch(setUserInviteStatus(inviteId, 'pending'));
        })
    }
    const acceptInvite = (teamId: number, inviteId: number) => {
        dispatch(setUserInviteStatus(inviteId, 'accepted'));
        put(`/teams/${teamId}/members/${user?.id}`)
            .then(async () => {
                const team = await get<Team>(`/teams/${teamId}`);
                dispatch(addTeam(team));
                close();
            })
            .catch(() => {
                dispatch(setUserInviteStatus(inviteId, 'pending'));
            })
    }

    return(
        <li className={styles['item']} key={invite.id}>
            <div className={styles['item-main']}>
                <div className={styles['item-icon']}>
                    {invite.team.name[0]}
                </div>
                <div className={styles['item-text']}>
                    <span className={styles['item-name']}>
                        {invite.team.name}
                    </span>
                    <span className={styles['invited-by']}>
                        invited by 
                        {' '}
                        <span>
                            {invite.sender.name}
                        </span>
                    </span>
                </div>
            </div>
            {invite.status === 'pending' ? (
                <div className={styles['item-buttons']}>
                    <HasTooltip tooltip={'Reject invite'}>
                        <Button 
                            type={'hollow'} 
                            onClick={() => rejectInvite(invite.team_id, invite.id)}
                        >
                            <CloseIcon />
                        </Button>
                    </HasTooltip>
                    <HasTooltip tooltip={'Accept invite'}>
                        <Button 
                            type={'hollow'}
                            onClick={() => acceptInvite(invite.team_id, invite.id)}
                        >
                            <CheckmarkIcon />
                        </Button>
                    </HasTooltip>
                </div>
            ) : (
                <span className={styles[invite.status]}>
                    {invite.status.slice(0,1).toUpperCase() + invite.status.slice(1)}
                </span>
            )}
        </li>
    )
}