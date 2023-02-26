import styles from './AddTask.module.scss';
import { AddIcon } from "@/assets/icons/AddIcon"
import { AddTaskGroup } from "./AddTaskGroup"
import { usePopout } from '@/contexts/popout';
import { TeamItems } from '@/popouts/team-items/TeamItems';
import { useRef } from 'react';
import { Label } from '@/types';

export const AddTaskLabels: React.FC<{
    teamId: number;
    labels: Label[];
    toggleLabel: (label: Label) => void;
}> = ({ teamId, labels, toggleLabel }) => {
    const { setPopout } = usePopout();
    const ref = useRef<HTMLButtonElement>(null);

    const openPopout = () => {
        setPopout({
            popout: (
                <TeamItems 
                    teamId={teamId}
                    type={'labels'}
                    onSelect={item => toggleLabel(item as Label)}
                    closeOnSelect
                />
            ),
            ref
        })
    }

    return(
        <AddTaskGroup header={'Labels'} className={styles['list']}>
            {labels.length !== 0 && (
                <ul>
                    {labels.map(label => (
                        <li key={label.id}>
                            <button 
                                className={styles['label']}
                                onClick={() => toggleLabel(label)}
                            >
                                <div 
                                    className={styles['label-dot']}
                                    style={{
                                        backgroundColor: label.color || 'var(--background-quaternary)'
                                    }}
                                />
                                {label.name}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            <button 
                className={styles['add-item']} 
                onClick={openPopout} 
                ref={ref}
            >
                <AddIcon />
            </button>
        </AddTaskGroup>
    )
}