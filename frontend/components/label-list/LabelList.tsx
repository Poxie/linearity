import styles from './LabelList.module.scss';
import { Label } from "@/types"

export const LabelList: React.FC<{
    labels: Label[];
    onLabelClick?: (label: Label) => void;
}> = ({ labels, onLabelClick }) => {
    return(
        <ul className={styles['container']}>
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