"use client";

import styles from './LabelInfo.module.scss';
import { IssueIcon } from "@/assets/icons/IssueIcon";
import { ModalGroup } from "@/modals/ModalGroup";
import { TaskRow } from "../task-row";

export const LabelInfoTasks: React.FC<{
    taskIds: number[];
}> = ({ taskIds }) => {
    return(
        <ModalGroup header={'Issues marked with label'} icon={<IssueIcon />}>
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
                    Actions
                </span>
            </div>
            {taskIds.map(taskId => <TaskRow taskId={taskId} />)}
        </ModalGroup>
    )
}