import styles from './SelectTeamItem.module.scss';
import { AddIcon } from "@/assets/icons/AddIcon";
import { usePopout } from "@/contexts/popout";
import { TeamItems } from "@/popouts/team-items/TeamItems";
import { Label, Member } from "@/types";
import { useRef } from "react";

export const SelectTeamItem: React.FC<{
    teamId: number;
    type: 'members' | 'labels';
    onSelect: (item: Member | Label) => void;
}> = ({ teamId, type, onSelect }) => {
    const { setPopout } = usePopout();
    const ref = useRef<HTMLButtonElement>(null);

    const openPopout = () => {
        setPopout({
            popout: (
                <TeamItems 
                    type={type} 
                    teamId={teamId} 
                    onSelect={onSelect} 
                    closeOnSelect 
                />
            ),
            ref
        })
    }

    return(
        <button 
            className={styles['button']}
            aria-label={'Add label'}
            onClick={openPopout}
            ref={ref}
        >
            <AddIcon />
        </button>
    )
}