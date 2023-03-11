import styles from './TeamItems.module.scss';
import { Member } from "@/types"
import { UserAvatar } from '@/components/user-avatar';

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
                        <UserAvatar 
                            className={styles['member-avatar']}
                            avatar={member.avatar}
                            name={member.name}
                            round
                        />
                        {member.name}
                    </button>
                </li>
            ))}
        </ul>
    )
}