import styles from './EditTaskModal.module.scss';
import { Input } from "@/components/input";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { selectTaskAssignees, selectTaskInfo, selectTaskLabels } from "@/redux/teams/selectors";
import { useRef, useState } from "react";
import { ModalMain } from "../ModalMain";
import { EditTaskGroup } from './EditTaskGroup';
import { InfoIcon } from '@/assets/icons/InfoIcon';
import { Label, Member } from '@/types';
import { addTaskAssignee, addTaskLabel, removeTaskAssignee, removeTaskLabel, updateTask } from '@/redux/teams/actions';
import { useAuth } from '@/contexts/auth';
import { LabelList } from '@/components/label-list/LabelList';
import { SelectTeamItem } from '@/components/select-team-item/SelectTeamItem';
import { AssigneeList } from '@/components/assignee-list/AssigneeList';
import { LabelIcon } from '@/assets/icons/LabelIcon';

export const EditTaskModal: React.FC<{
    taskId: number;
}> = ({ taskId }) => {
    const { patch, put, destroy } = useAuth();
    
    const dispatch = useAppDispatch();
    const labels = useAppSelector(state => selectTaskLabels(state, taskId));
    const assignees = useAppSelector(state => selectTaskAssignees(state, taskId));
    const { title, description, team_id } = useAppSelector(state => selectTaskInfo(state, taskId));
    
    const [titleEdit, setTitleEdit] = useState(false);
    const [descriptionEdit, setDescriptionEdit] = useState(false);

    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);

    const updateTitle = () => {
        const newTitle = titleRef.current?.value;
        if(!newTitle) return setTitleEdit(false);

        dispatch(updateTask(taskId, 'title', newTitle));
        setTitleEdit(false);
        
        patch(`/tasks/${taskId}`, {
            title: newTitle
        }).catch(() => {
            dispatch(updateTask(taskId, 'title', title));
        })
    }
    const updateDescription = () => {
        const newDescription = descriptionRef.current?.value;

        dispatch(updateTask(taskId, 'description', newDescription));
        setDescriptionEdit(false);
        
        patch(`/tasks/${taskId}`, {
            description: newDescription
        }).catch(() => {
            dispatch(updateTask(taskId, 'description', description));
        })
    }

    const toggleLabel = (label: Label) => {
        const exists = labels?.find(l => l.id === label.id);
        
        const addLabel = () => dispatch(addTaskLabel(taskId, label));
        const removeLabel = () => dispatch(removeTaskLabel(taskId, label.id));

        if(!exists) {
            addLabel();
            put(`/tasks/${taskId}/labels/${label.id}`)
                .catch(removeLabel);
        } else {
            removeLabel();
            destroy(`/tasks/${taskId}/labels/${label.id}`)
                .catch(addLabel);
        }
    }
    const toggleAssignee = (assignee: Member) => {
        const exists = assignees?.find(l => l.id === assignee.id);
        
        const addAssignee = () => dispatch(addTaskAssignee(taskId, assignee));
        const removeAssignee = () => dispatch(removeTaskAssignee(taskId, assignee.id));

        if(!exists) {
            addAssignee();
            put(`/tasks/${taskId}/assignees/${assignee.id}`)
                .catch(removeAssignee);
        } else {
            removeAssignee();
            destroy(`/tasks/${taskId}/assignees/${assignee.id}`)
                .catch(addAssignee);
        }
    }

    if(!team_id) return null;
    return(
        <>
            <ModalMain className={styles['container']}>
                <EditTaskGroup 
                    header={'Issue information'} 
                    icon={<InfoIcon />}
                    className={styles['header']}
                >
                    {!titleEdit ? (
                        <h1 onClick={() => setTitleEdit(true)}>
                            {title}
                        </h1>
                    ) : (
                        <Input 
                            placeholder={'Title'}
                            defaultValue={title}
                            onBlur={updateTitle}
                            ref={titleRef}
                            focusOnMount
                        />
                    )}
                    {!descriptionEdit && description ? (
                        <span onClick={() => setDescriptionEdit(true)}>
                            {description}
                        </span>
                    ) : (
                        <Input 
                            placeholder={'Add a better description'}
                            defaultValue={description}
                            onBlur={updateDescription}
                            ref={descriptionRef}
                            focusOnMount
                            textArea
                        />
                    )}
                </EditTaskGroup>
                <EditTaskGroup 
                    header={'Labels & Assignees'} 
                    icon={<LabelIcon />}
                    className={styles['items']}
                >
                    <div>
                        <span className={styles['item-header']}>
                            Labels
                        </span>
                        <div className={styles['item-container']}>
                            {labels?.length !== 0 && (
                                <LabelList 
                                    labels={labels || []}
                                    onLabelClick={toggleLabel}
                                />
                            )}
                            <SelectTeamItem 
                                teamId={team_id}
                                onSelect={item => toggleLabel(item as Label)}
                                type={'labels'}
                            />
                        </div>
                    </div>
                    <div>
                        <span className={styles['item-header']}>
                            Assignees
                        </span>
                        <div className={styles['item-container']}>
                            {assignees?.length !== 0 && (
                                <AssigneeList 
                                    members={assignees || []}
                                    onMemberClick={toggleAssignee}
                                />
                            )}
                            <SelectTeamItem 
                                teamId={team_id}
                                onSelect={item => toggleAssignee(item as Member)}
                                type={'members'}
                            />
                        </div>
                    </div>
                </EditTaskGroup>
            </ModalMain>
        </>
    )
}