import styles from './AssigneeList.module.scss';
import { Member } from "@/types"
import { SelectTeamItem } from '../select-team-item/SelectTeamItem';

export const AssigneeList: React.FC<{
    members: Member[];
    onMemberClick?: (member: Member) => void;
    onMemberSelected?: (member: Member) => void;
    teamId?: number
}> = ({ members, onMemberClick, onMemberSelected, teamId }) => {
    if(onMemberSelected && !teamId) throw new Error('onMemberSelected requires teamId prop');

    return(
        <ul className={styles['container']}>
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

            {onMemberSelected && (
                <SelectTeamItem 
                    teamId={teamId as number}
                    onSelect={item => onMemberSelected(item as Member)}
                    type={'members'}
                />
            )}
        </ul>
    )
}