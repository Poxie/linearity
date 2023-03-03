import styles from './EditTaskModal.module.scss';
import { Input } from "@/components/input";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { selectTaskAssignees, selectTaskInfo, selectTaskLabels } from "@/redux/teams/selectors";
import { useRef, useState } from "react";
import { ModalMain } from "../ModalMain";
import { InfoIcon } from '@/assets/icons/InfoIcon';
import { Label, Member } from '@/types';
import { useAuth } from '@/contexts/auth';
import { LabelList } from '@/components/label-list/LabelList';
import { SelectTeamItem } from '@/components/select-team-item/SelectTeamItem';
import { AssigneeList } from '@/components/assignee-list/AssigneeList';
import { LabelIcon } from '@/assets/icons/LabelIcon';
import { TimeIcon } from '@/assets/icons/TimeIcon';
import { TimeSeletor } from '@/components/time-selector';
import { useTask } from '@/hooks/useTask';
import { ModalGroup } from '../ModalGroup';

export const EditTaskModal: React.FC<{
    taskId: number;
}> = ({ taskId }) => {
    const { patch, put, destroy } = useAuth();
    const { addLabel, removeLabel, addAssignee, removeAssignee, updateProperty } = useTask(taskId);
    
    const dispatch = useAppDispatch();
    const labels = useAppSelector(state => selectTaskLabels(state, taskId));
    const assignees = useAppSelector(state => selectTaskAssignees(state, taskId));
    const { title, description, team_id, due_at } = useAppSelector(state => selectTaskInfo(state, taskId));
    
    const [titleEdit, setTitleEdit] = useState(false);
    const [descriptionEdit, setDescriptionEdit] = useState(false);

    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);

    const updateTitle = () => {
        if(!titleRef.current?.value || title === titleRef.current?.value) return setTitleEdit(false);
        updateProperty('title', titleRef.current?.value, title);
        setTitleEdit(false);
    }
    const updateDescription = () => {
        if(description === descriptionRef.current?.value) return setDescriptionEdit(false);
        updateProperty('description', descriptionRef.current?.value, description);
        setDescriptionEdit(false);
    }
    const toggleLabel = (label: Label) => {
        const exists = labels?.find(l => l.id === label.id);

        if(!exists) {
            addLabel(label);
        } else {
            removeLabel(label);
        }
    }
    const toggleAssignee = (assignee: Member) => {
        const exists = assignees?.find(l => l.id === assignee.id);

        if(!exists) {
            addAssignee(assignee);
        } else {
            removeAssignee(assignee);
        }
    }

    if(!team_id) return null;
    return(
        <>
            <ModalMain className={styles['container']}>
                <ModalGroup 
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
                </ModalGroup>
                <ModalGroup 
                    header={'Labels & Assignees'} 
                    icon={<LabelIcon />}
                    className={styles['items']}
                >
                    <div>
                        <span className={styles['item-header']}>
                            Labels
                        </span>
                        <LabelList 
                            labels={labels || []}
                            onLabelClick={toggleLabel}
                            onLabelSelected={toggleLabel}
                            teamId={team_id}
                        />
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
                                    onMemberSelected={toggleAssignee}
                                    teamId={team_id}
                                />
                            )}
                        </div>
                    </div>
                </ModalGroup>
                <ModalGroup header={'Due at'} icon={<TimeIcon />}>
                    <div className={styles['item-container']}>
                        <TimeSeletor 
                            defaultTime={due_at}
                            onChange={date => updateProperty('due_at', date?.getTime(), due_at)}
                            emptyLabel={'Due date not selected'}
                        />
                    </div>
                </ModalGroup>
            </ModalMain>
        </>
    )
}