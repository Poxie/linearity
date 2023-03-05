import styles from './LabelList.module.scss';
import { Label } from "@/types"
import { LabelListItem } from './LabelListItem';
import { SelectTeamItem } from '../select-team-item/SelectTeamItem';

export const LabelList: React.FC<{
    labels: Label[];
    onLabelClick?: (label: Label) => void;
    small?: boolean;
    hasContextMenu?: boolean;
    contextMenuOnClick?: boolean;
    teamId?: number;
    onLabelSelected?: (label: Label) => void;
}> = ({ labels, onLabelClick, small, hasContextMenu, contextMenuOnClick, teamId, onLabelSelected }) => {
    if(onLabelSelected && !teamId) throw new Error('onLabelSelected requires teamId prop');
    if(contextMenuOnClick && !hasContextMenu) throw new Error('contextMenuOnClick requires hasContextMenu prop');

    const className = [
        styles['container'],
        small ? styles['small'] : ''
    ].join(' ');
    return(
        <ul className={className}>
            {labels.map(label => (
                <LabelListItem 
                    label={label}
                    hasContextMenu={hasContextMenu}
                    contextMenuOnClick={contextMenuOnClick}
                    onLabelClick={onLabelClick}
                    small={small}
                    key={label.id}
                />
            ))}
            {onLabelSelected && (
                <SelectTeamItem 
                    teamId={teamId as number}
                    onSelect={item => onLabelSelected(item as Label)}
                    type={'labels'}
                />
            )}
        </ul>
    )
}