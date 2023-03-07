import styles from './Group.module.scss';
import { useAppSelector } from "@/redux/store";
import { selectTaskAssignees } from "@/redux/teams/selectors";
import { AddIcon } from '@/assets/icons/AddIcon';
import { HasTooltip } from '@/contexts/tooltip/HasTooltip';
import { useRef } from 'react';
import { usePopout } from '@/contexts/popout';
import { TeamItems } from '@/popouts/team-items/TeamItems';
import { useBlock } from './GroupBlock';
import { useTask } from '@/hooks/useTask';
import { Label, Member } from '@/types';
import { MemberPopout } from '@/popouts/member/MemberPopout';
import { GroupTaskAssignee } from './GroupTaskAssignee';

export const GroupTaskAssignees: React.FC<{
    taskId: number;
}> = ({ taskId }) => {
    const { close, setPopout } = usePopout();
    const { addAssignee } = useTask(taskId);
    const { teamId } = useBlock();
    const assignees = useAppSelector(state => selectTaskAssignees(state, taskId));

    const ref = useRef<HTMLButtonElement>(null);

    const addMember = (item: Label | Member) => {
        addAssignee(item as Member);
        close();
    }
    const openPopout = () => setPopout({
        popout: <TeamItems onSelect={addMember} teamId={teamId} type={'members'} />,
        options: { position: 'top' },
        ref
    })

    const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });
    const assigneeNames = formatter.format(assignees?.map(assignee => assignee.name) || []);
    return(
        <HasTooltip 
            className={styles['task-assignees']}
            tooltip={assignees?.length ? `Assigned to ${assigneeNames}` : 'Assign issue'}
        >
            <>
            {!assignees?.length ? (
                <button 
                    onClick={openPopout}
                    aria-label={'Assign issue'}
                    className={styles['assign-button']}
                    ref={ref}
                >
                    <AddIcon />
                </button>
            ) : (
                assignees?.map(assignee => (
                    <GroupTaskAssignee 
                        assignee={assignee} 
                        key={assignee.id} 
                    />
                ))
            )}
            </>
        </HasTooltip>
    )
}