import styles from './LabelList.module.scss';
import { Label } from "@/types"

export const LabelList: React.FC<{
    labels: Label[];
    onLabelClick?: (label: Label) => void;
    small?: boolean;
}> = ({ labels, onLabelClick, small }) => {
    const className = [
        styles['container'],
        small ? styles['small'] : ''
    ].join(' ');
    return(
        <ul className={className}>
            {labels.map(label => (
                <li key={label.id}>
                    <button 
                        className={styles['item']}
                        onClick={() => {
                            if(onLabelClick) onLabelClick(label);
                        }}
                        style={label.color ? {
                            backgroundColor: label.color,
                            borderColor: label.color
                        } : undefined}
                    >
                        {label.name}
                    </button>
                </li>
            ))}
        </ul>
    )
}