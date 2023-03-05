import styles from './LabelList.module.scss';
import { Label } from "@/types"
import { MenuGroup, useMenu } from '@/contexts/menu';
import { useRef } from 'react';
import { useTeam } from '@/hooks/useTeam';
import { useModal } from '@/contexts/modal';
import { AddLabelModal } from '@/modals/add-label/AddLabelModal';
import { HasTooltip } from '@/contexts/tooltip/HasTooltip';

export const LabelListItem: React.FC<{
    small?: boolean;
    label: Label;
    hasContextMenu?: boolean;
    contextMenuOnClick?: boolean;
    onLabelClick?: (label: Label) => void;
}> = ({ small, label, hasContextMenu, onLabelClick, contextMenuOnClick }) => {
    const { setMenu } = useMenu();
    const { setModal } = useModal();
    const { removeLabel } = useTeam(label.team_id);

    const ref = useRef<HTMLButtonElement>(null);

    const handleContextMenu = (event: React.MouseEvent) => {
        if(!hasContextMenu) return;

        const groups: MenuGroup[] = [
            [
                { text: 'Edit label', onClick: () => setModal(<AddLabelModal teamId={label.team_id} label={label} />), type: 'default' }
            ],
            [
                { text: 'Delete label', onClick: () => removeLabel(label), type: 'danger' }
            ]
        ]

        setMenu({
            element: ref,
            event,
            groups
        })
    }

    const button = (
        <button 
            className={styles['item']}
            style={label.color ? {
                backgroundColor: label.color,
                borderColor: label.color
            } : undefined}
            onClick={(e) => {
                if(contextMenuOnClick) handleContextMenu(e);
                if(onLabelClick) onLabelClick(label);
            }}
            onContextMenu={handleContextMenu}
            aria-label={label.name}
            ref={ref}
        >
            <span>
                {label.name}
            </span>
        </button>
    )
    return(
        <li key={label.id}>
            {small ? (
                <HasTooltip tooltip={label.name}>
                    {button}
                </HasTooltip>
            ) : button}
        </li>
    )
}