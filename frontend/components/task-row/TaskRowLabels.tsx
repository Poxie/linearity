import styles from './TaskRow.module.scss';
import { useAppSelector } from "@/redux/store";
import { selectTaskLabels } from "@/redux/teams/selectors";
import { LabelList } from "../label-list/LabelList"
import { SelectTeamItem } from "../select-team-item/SelectTeamItem";
import { Label, Member } from '@/types';
import { useTask } from '@/hooks/useTask';

export const TaskRowLabels: React.FC<{
    taskId: number;
    teamId: number;
}> = ({ taskId, teamId }) => {
    const labels = useAppSelector(state => selectTaskLabels(state, taskId));
    const { addLabel, removeLabel } = useTask(taskId);

    const onSelect = (label: Label | Member) => {
        const exists = labels?.find(l => l.id === label.id);
        exists ? removeLabel(label as Label) : addLabel(label as Label);
    }

    return(
        <div className={styles['rows']}>
            <LabelList 
                labels={labels || []}
                onLabelClick={onSelect}
                onLabelSelected={onSelect}
                teamId={teamId}
            />
        </div>
    )
}