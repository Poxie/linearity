import styles from './AssigneeList.module.scss';
import { Member } from "@/types"
import { SelectTeamItem } from '../select-team-item/SelectTeamItem';
import { UserAvatar } from '../user-avatar';

export const AssigneeList: React.FC<{
    members: Member[];
    onMemberClick?: (member: Member) => void;
    onMemberSelected?: (member: Member) => void;
    teamId?: number
    onAddButtonClicked?: () => void;
}> = ({ members, onMemberClick, onMemberSelected, teamId, onAddButtonClicked }) => {
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
                        <UserAvatar 
                            className={styles['item-avatar']}
                            avatar={member.avatar}
                            name={member.name}
                            round
                        />
                        {member.name}
                    </button>
                </li>
            ))}

            {(onMemberSelected || onAddButtonClicked) && (
                <SelectTeamItem 
                    teamId={teamId as number}
                    onSelect={item => {
                        if(onMemberSelected) onMemberSelected(item as Member);
                    }}
                    onAddButtonClicked={onAddButtonClicked}
                    type={'members'}
                />
            )}
        </ul>
    )
}