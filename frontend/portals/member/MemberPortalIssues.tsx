import styles from './MemberPortal.module.scss';
import { GroupTask } from "@/components/group/GroupTask";
import { useAppSelector } from "@/redux/store";
import { selectMemberById, selectTasksByAssignee } from "@/redux/teams/selectors";
import { MemberIssuesFilters } from './MemberIssuesFilters';
import { useMemo, useState } from 'react';
import { Label } from '@/types';

export const MemberPortalIsseus: React.FC<{
    teamId: number;
    memberId: number;
}> = ({ teamId, memberId }) => {
    const tasks = useAppSelector(state => selectTasksByAssignee(state, teamId, memberId));
    const member = useAppSelector(state => selectMemberById(state, teamId, memberId));

    const [label, setLabel] = useState<Label | null>(null);

    const filteredTasks = useMemo(() => tasks.filter(task => (
        label ? task.labels.find(l => l.id === label.id) : true
    )), [memberId, label?.id]);
    return(
        <>
        <MemberIssuesFilters 
            label={label}
            setLabel={setLabel}
            teamId={teamId}
        />
        <div className={styles['tasks']}>
            {filteredTasks.map(task => (
                <GroupTask 
                    taskId={task.id}
                    className={styles['task']}
                    key={task.id}
                />
            ))}

            {!filteredTasks.length && (
                <span className={styles['empty']}>
                    {member?.name} has no {label ? 'issues matching the filters' : 'assigned issues'}
                </span>
            )}
        </div>
        </>
    )
}