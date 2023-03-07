import styles from './Group.module.scss';
import { usePopout } from "@/contexts/popout";
import { MemberPopout } from "@/popouts/member/MemberPopout";
import { Member } from "@/types"
import { useRef } from "react";

export const GroupTaskAssignee: React.FC<{
    assignee: Member;
}> = ({ assignee }) => {
    const { setPopout } = usePopout();
    
    const ref = useRef<HTMLButtonElement>(null);

    const openPopout = () => setPopout({
        popout: (
            <MemberPopout 
                teamId={assignee.team_id} 
                userId={assignee.id}
            />
        ),
        ref
    })

    return(
        <button 
            className={styles['assignee']}
            onClick={openPopout}
            key={assignee.id}
            ref={ref}
        >
            {assignee.name[0]}
        </button>
    )
}