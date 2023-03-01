import styles from './AssigneeList.module.scss';
import { Member } from "@/types"

export const AssigneeList: React.FC<{
    members: Member[];
    onMemberClick?: (member: Member) => void;
}> = ({ members, onMemberClick }) => {
    return(
        <ul>
            {members.map(member => (
                <li key={member.id}>
                    <button
                        className={styles['item']}
                        onClick={() => {
                            onMemberClick && onMemberClick(member);
                        }}
                    >
                        <div className={styles['item-icon']}>
                            {member.name[0]}
                        </div>
                        {member.name}
                    </button>
                </li>
            ))}
        </ul>
    )
}