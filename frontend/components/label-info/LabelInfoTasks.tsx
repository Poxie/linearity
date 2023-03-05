"use client";

import styles from './LabelInfo.module.scss';
import { IssueIcon } from "@/assets/icons/IssueIcon";
import { ModalGroup } from "@/modals/ModalGroup";
import { TaskRow } from "../task-row";

export const LabelInfoTasks: React.FC<{
    taskIds: number[];
    loading: boolean;
}> = ({ taskIds, loading }) => {
    return(
        <ModalGroup header={'Issues marked with label'} icon={<IssueIcon />}>
            {!loading && taskIds.length !== 0 && (
                <div className={styles['row']}>
                    <span>
                        Title
                    </span>
                    <span>
                        Description
                    </span>
                    <span>
                        Labels
                    </span>
                    <span>
                        Assignees
                    </span>
                    <span>
                        Due at
                    </span>
                    <span>
                        Actions
                    </span>
                </div>
            )}

            {loading && (
                Array.from(Array(4)).map((_,key) => (
                    <div className={styles['placeholder']} key={key} />
                ))
            )}

            {!loading && taskIds.length === 0 && (
                <span className={styles['empty']}>
                    There are no issues with this label.
                </span>
            )}
            {taskIds.map(taskId => <TaskRow taskId={taskId} key={taskId} />)}
        </ModalGroup>
    )
}