import styles from './LabelList.module.scss';
import { Label } from "@/types"
import { MenuGroup, useMenu } from '@/contexts/menu';
import { LabelListItem } from './LabelListItem';

export const LabelList: React.FC<{
    labels: Label[];
    onLabelClick?: (label: Label) => void;
    small?: boolean;
    hasContextMenu?: boolean;
}> = ({ labels, onLabelClick, small, hasContextMenu }) => {
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
                    onLabelClick={onLabelClick}
                    key={label.id}
                />
            ))}
        </ul>
    )
}