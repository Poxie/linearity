import styles from './TaskRow.module.scss';
import { useAppSelector } from "@/redux/store";
import { selectTaskAssignees, selectTaskLabels } from "@/redux/teams/selectors";
import { SelectTeamItem } from "../select-team-item/SelectTeamItem";
import { Label, Member } from '@/types';
import { useTask } from '@/hooks/useTask';

export const TaskRowAssignees: React.FC<{
    taskId: number;
    teamId: number;
}> = ({ taskId, teamId }) => {
    const assignees = useAppSelector(state => selectTaskAssignees(state, taskId));
    const { addAssignee, removeAssignee } = useTask(taskId);

    const onSelect = (member: Label | Member) => {
        const exists = assignees?.find(a => a.id === member.id);
        exists ? removeAssignee(member as Member) : addAssignee(member as Member);
    }

    return(
        <div className={styles['rows']}>
            {assignees?.map(assignee => (
                <div className={styles['assignee-icon']} key={assignee.id}>
                    {assignee.name[0]}
                </div>
            ))}
            <SelectTeamItem 
                type={'members'} 
                teamId={teamId} 
                onSelect={onSelect}
                className={styles['add-button']}
            />
        </div>
    )
}