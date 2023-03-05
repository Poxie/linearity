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
    className?: string;
    onAddButtonClicked?: () => void;
}> = ({ teamId, type, onSelect, className, onAddButtonClicked }) => {
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

    className = [
        styles['button'],
        className
    ].join(' ');
    return(
        <button 
            className={className}
            aria-label={'Add label'}
            onClick={onAddButtonClicked || openPopout}
            ref={ref}
        >
            <AddIcon />
        </button>
    )
}