import styles from './InvitesPopout.module.scss';
import { useAppSelector } from "@/redux/store"
import { selectUserInvites } from "@/redux/user/selectors"
import { InvitesPopoutItem } from './InvitesPopoutItem';

export const InvitesPopout = () => {
    const invites = useAppSelector(selectUserInvites);
    
    return(
        <div className={styles['container']}>
            <span className={styles['header']}>
                Team invites
            </span>
            {invites.length ? (
                <ul className={styles['items']}>
                    {invites.map(invite => (
                        <InvitesPopoutItem 
                            invite={invite}
                            key={invite.id}
                        />
                    ))}
                </ul>
            ) : (
                <span className={styles['empty']}>
                    You have not received any invites.
                </span>
            )}
        </div>
    )
}