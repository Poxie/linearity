import styles from './MemberPortal.module.scss';
import { GroupTask } from "@/components/group/GroupTask";
import { useAppSelector } from "@/redux/store";
import { selectMemberById, selectTasksByAssignee } from "@/redux/teams/selectors";

export const MemberPortalIsseus: React.FC<{
    teamId: number;
    memberId: number;
}> = ({ teamId, memberId }) => {
    const tasks = useAppSelector(state => selectTasksByAssignee(state, teamId, memberId));
    const member = useAppSelector(state => selectMemberById(state, teamId, memberId));

    return(
        <div className={styles['tasks']}>
            {tasks.map(task => (
                <GroupTask 
                    taskId={task.id}
                    className={styles['task']}
                    key={task.id}
                />
            ))}

            {!tasks.length && (
                <span className={styles['empty']}>
                    {member?.name} has no assigned issues
                </span>
            )}
        </div>
    )
}