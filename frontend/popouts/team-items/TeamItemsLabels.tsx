import styles from './TeamItems.module.scss';
import { Label } from "@/types"

export const TeamItemsLabels: React.FC<{
    labels: Label[];
    handleSelect: (label: Label) => void;
}> = ({ labels, handleSelect }) => {
    return(
        <ul className={styles['item-list']}>
            {labels.map(label => (
                <li key={label.id}>
                    <button
                        onClick={() => handleSelect(label)}
                        className={styles['label']}
                    >
                        <div 
                            className={styles['label-dot']}
                            style={{ backgroundColor: label.color || 'var(--background-quinary)' }}
                        />
                        {label.name}
                    </button>
                </li>
            ))}
        </ul>
    )
}