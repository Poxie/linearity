import styles from './Group.module.scss';
import { Member } from "@/types"
import { usePortal } from '@/contexts/portal';
import { MemberPortal } from '@/portals/member/MemberPortal';

export const GroupTaskAssignee: React.FC<{
    assignee: Member;
}> = ({ assignee }) => {
    const { setPortal } = usePortal();

    const openPortal = () => setPortal(
        <MemberPortal 
            teamId={assignee.team_id} 
            userId={assignee.id}
        />
    )

    return(
        <button 
            className={styles['assignee']}
            onClick={openPortal}
        >
            {assignee.name[0]}
        </button>
    )
}