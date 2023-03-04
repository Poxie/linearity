import Button from "../button"
import styles from './TeamSelection.module.scss';
import { InboxIcon } from "@/assets/icons/InboxIcon"
import { useAppSelector } from "@/redux/store";
import { selectUserInviteCount } from "@/redux/user/selectors";
import { usePopout } from "@/contexts/popout";
import { useRef } from "react";
import { InvitesPopout } from "@/popouts/invites/InvitesPopout";

export const TeamSelectionInbox = () => {
    const { setPopout } = usePopout();
    const inviteCount = useAppSelector(selectUserInviteCount);
    const ref = useRef<HTMLButtonElement>(null);

    const viewInvites = () => (
        setPopout({
            popout: <InvitesPopout />,
            ref
        })
    )

    return(
        <Button 
            className={styles['inbox-button']}
            onClick={viewInvites}
            ref={ref}
        >
            <InboxIcon />

            {inviteCount && (
                <span className={styles['invite-count']}>
                    {inviteCount}
                </span>
            )}
        </Button>
    )
}