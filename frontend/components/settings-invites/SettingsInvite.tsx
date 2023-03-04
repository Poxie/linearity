import Button from "../button";
import styles from './SettingsInvites.module.scss';
import { HasTooltip } from "@/contexts/tooltip/HasTooltip";
import { Invite } from "@/types"
import { CloseIcon } from "@/assets/icons/CloseIcon";
import { useAppDispatch } from "@/redux/store";
import { updateInviteStatus } from "@/redux/teams/actions";
import { useAuth } from "@/contexts/auth";

export const SettingsInvite: React.FC<{
    invite: Invite;
}> = ({ invite }) => {
    const { patch } = useAuth();
    const dispatch = useAppDispatch();

    const expireInvite = (inviteId: number) => {
        dispatch(updateInviteStatus(inviteId, 'expired'));
        patch(`/teams/${invite.team_id}/invites/${inviteId}`, {
            status: 'expired'
        }).catch(error => {
            console.log(error);
            dispatch(updateInviteStatus(inviteId, 'pending'));
        })
    }

    const role = invite.role.slice(0,1).toUpperCase() + invite.role.slice(1);
    const createdAt = new Date(invite.created_at * 1000).toLocaleString('en', { dateStyle: 'medium', timeStyle: 'short' })
    const statusString = invite.status.slice(0, 1).toUpperCase() + invite.status.slice(1);
    const statusTooltip = (
        !invite.updated_at ? (
            `Invite is ${invite.status}`
        ) : (
            `${statusString} on ${
                new Date(invite.updated_at * 1000)
                    .toLocaleString('en', { 
                        dateStyle: 'medium', 
                        timeStyle: 'short' 
                    })}
            `
        )
    )

    const statusClassName = [
        styles['status'],
        styles[invite.status]
    ].join(' ');
    return(
        <li className={styles['item']}>
            <div className={styles['flex']}>
                <div className={styles['icon']}>
                    {invite.user.name[0]}
                </div>
                <span>
                    {invite.user.name}
                </span>
            </div>
            <span>
                {role}
            </span>
            <span>
                {invite.sender.name}
            </span>
            <span>
                {createdAt}
            </span>
            <div className={styles['flex']}>
                <HasTooltip tooltip={statusTooltip}>
                    <span 
                        className={statusClassName}
                    >
                        {statusString}
                    </span>
                </HasTooltip>
            </div>
            <div className={styles['buttons']}>
                {invite.status === 'pending' && (
                    <HasTooltip tooltip={'Expire invite'}>
                        <Button 
                            onClick={() => expireInvite(invite.id)}
                            ariaLabel={'Expire invite'}
                        >
                            <CloseIcon />
                        </Button>
                    </HasTooltip>
                )}
            </div>
        </li>
    )
}