import styles from './MemberPortal.module.scss';
import { GroupTask } from "@/components/group/GroupTask";
import { useAuth } from "@/contexts/auth";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setTasks } from "@/redux/teams/actions";
import { selectTasksByAssignee } from "@/redux/teams/selectors";
import { Task } from "@/types";
import { useEffect, useState } from "react";

export const MemberPortalIsseus: React.FC<{
    teamId: number;
    memberId: number;
}> = ({ teamId, memberId }) => {
    const { get } = useAuth();
    const dispatch = useAppDispatch();

    const tasks = useAppSelector(state => selectTasksByAssignee(state, teamId, memberId));
    
    useEffect(() => {
        if(tasks.length) return;

        get<Task[]>(`/teams/${teamId}/members/${memberId}/tasks`)
            .then(tasks => {
                dispatch(setTasks(tasks));
            })
    }, [tasks.length, teamId, memberId]);

    return(
        <div className={styles['tasks']}>
            {tasks.map(task => (
                <GroupTask 
                    taskId={task.id}
                    className={styles['task']}
                />
            ))}
        </div>
    )
}