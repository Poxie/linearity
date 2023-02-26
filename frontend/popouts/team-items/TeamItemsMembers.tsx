import styles from './TeamItems.module.scss';
import { Member } from "@/types"

export const TeamItemsMembers: React.FC<{
    members: Member[];
    handleSelect: (member: Member) => void;
}> = ({ members, handleSelect }) => {
    return(
        <ul className={styles['item-list']}>
            {members.map(member => (
                <li key={member.id}>
                    <button 
                        className={styles['member-item']}
                        onClick={() => handleSelect(member)}
                    >
                        <span className={styles['member-icon']}>
                            {member.name[0]}
                        </span>
                        {member.name}
                    </button>
                </li>
            ))}
        </ul>
    )
}