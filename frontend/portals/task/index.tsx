import styles from './TaskPortal.module.scss';
import { useAppSelector } from "@/redux/store";
import { selectTaskAssignees, selectTaskInfo, selectTaskLabels } from "@/redux/teams/selectors";
import { Portal } from "../Portal";
import { TaskPortalGroup } from "./TaskPortalGroup";
import { TaskPortalAssignee } from './TaskPortalAssignee';
import { AddIcon } from '@/assets/icons/AddIcon';

export const TaskPortal: React.FC<{
    groupId: number;
    blockId: number;
    taskId: number;
}> = ({ groupId, blockId, taskId }) => {
    const { title, description } = useAppSelector(state => selectTaskInfo(state, groupId, blockId, taskId));
    const labels = useAppSelector(state => selectTaskLabels(state, groupId, blockId, taskId));
    const assignees = useAppSelector(state => selectTaskAssignees(state, groupId, blockId, taskId));

    return(
        <Portal 
            header={title || ''} 
            subHeader={description}
        >
            <TaskPortalGroup header={'Labels'}>
                {labels && (
                    <ul className={styles['labels']}>
                        {labels?.map(label => (
                            <li 
                                style={{
                                    backgroundColor: label.color || 'var(--background-quaternary)',
                                    borderColor: label.color || 'var(--background-quaternary)'
                                }}
                                className={styles['label']}
                                key={label.id}
                            >
                                {label.name}
                            </li>
                        ))}
                    </ul>
                )}
            </TaskPortalGroup>
            <TaskPortalGroup header={'Assignee(s)'}>
                <ul className={styles['assignees']}>
                    {assignees?.map(assignee => (
                        <TaskPortalAssignee 
                            icon={assignee.name[0]}
                            text={assignee.name}
                            key={assignee.id}
                        />
                    ))}
                    <TaskPortalAssignee 
                        icon={<AddIcon />}
                        text={'Add assignee'}
                        className={styles['add-assignee']}
                    />
                </ul>
            </TaskPortalGroup>
        </Portal>
    )
}