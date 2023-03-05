import styles from './Group.module.scss';
import { useAppSelector } from "@/redux/store";
import { selectTaskAssignees } from "@/redux/teams/selectors";
import { useTask } from "./GroupTask"
import { AddIcon } from '@/assets/icons/AddIcon';
import { HasTooltip } from '@/contexts/tooltip/HasTooltip';

export const GroupTaskAssignees = () => {
    const { taskId } = useTask();
    const assignees = useAppSelector(state => selectTaskAssignees(state, taskId));

    const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });
    const assigneeNames = formatter.format(assignees?.map(assignee => assignee.name) || []);
    return(
        <HasTooltip 
            className={styles['task-assignees']}
            tooltip={assignees?.length ? `Assigned to ${assigneeNames}` : 'Assign issue'}
        >
            <>
            {assignees?.map(assignee => (
                <span key={assignee.id}>
                    {assignee.name[0]}
                </span>
            ))}
            {!assignees?.length && (
                <AddIcon />
            )}
            </>
        </HasTooltip>
    )
}