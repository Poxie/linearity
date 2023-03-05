import styles from './Group.module.scss';
import { TimeIcon } from "@/assets/icons/TimeIcon";
import { usePopout } from "@/contexts/popout";
import { HasTooltip } from "@/contexts/tooltip/HasTooltip";
import { TimeSelectorPopout } from "@/popouts/time-selector/TimeSelectorPopout";
import { useAppSelector } from "@/redux/store";
import { selectTaskInfo } from "@/redux/teams/selectors";
import { useRef } from "react";
import { useTask } from '@/hooks/useTask';

export const GroupTaskDueAt: React.FC<{
    taskId: number;
}> = ({ taskId }) => {
    const { setPopout } = usePopout();
    const { updateProperty } = useTask(taskId);
    const { due_at } = useAppSelector(state => selectTaskInfo(state, taskId));
    const ref = useRef<HTMLButtonElement>(null);

    if(!due_at) return <div></div>;

    const openPopout = () => setPopout({
        popout: <TimeSelectorPopout onChange={date => updateProperty('due_at', date?.getTime(), due_at)} closeOnSelect />,
        ref
    })

    const date = new Date(due_at);
    const readableDate = date.toLocaleString('en', { dateStyle: 'medium' }).split(',')[0];
    const readableLongDate = date.toLocaleString('en', { dateStyle: 'long' });
    return(
        <HasTooltip tooltip={`Due at ${readableLongDate}`}>
            <button 
                className={styles['due-at']}
                onClick={openPopout}
                ref={ref}
            >
                <TimeIcon />
                {readableDate}
            </button>
        </HasTooltip>
    )
}