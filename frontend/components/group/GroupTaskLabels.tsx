import { useAppSelector } from '@/redux/store';
import { selectTaskLabels } from '@/redux/teams/selectors';
import { LabelList } from '../label-list/LabelList';
import { useTask } from './GroupTask';

export const GroupTaskLabels = () => {
    const { taskId } = useTask();
    const labels = useAppSelector(state => selectTaskLabels(state, taskId));
    if(!labels?.length) return null;

    return(
        <LabelList 
            labels={labels}
            small
        />
    )
}