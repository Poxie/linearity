import styles from './LabelList.module.scss';
import { Label } from "@/types"
import { MenuGroup, useMenu } from '@/contexts/menu';
import { useRef } from 'react';
import { useSettings } from '../settings';
import { useTeam } from '@/hooks/useTeam';
import { useModal } from '@/contexts/modal';
import { AddLabelModal } from '@/modals/add-label/AddLabelModal';

export const LabelListItem: React.FC<{
    label: Label;
    hasContextMenu?: boolean;
    onLabelClick?: (label: Label) => void;
}> = ({ label, hasContextMenu, onLabelClick }) => {
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

    return(
        <li key={label.id}>
            <button 
                className={styles['item']}
                onClick={() => {
                    if(onLabelClick) onLabelClick(label);
                }}
                onContextMenu={handleContextMenu}
                style={label.color ? {
                    backgroundColor: label.color,
                    borderColor: label.color
                } : undefined}
                ref={ref}
            >
                {label.name}
            </button>
        </li>
    )
}