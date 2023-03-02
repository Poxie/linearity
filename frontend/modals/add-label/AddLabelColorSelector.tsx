import { CheckIcon } from '@/assets/icons/CheckIcon';
import { useState } from 'react';
import styles from './AddLabel.module.scss';

const DEFAULT_COLORS = [null, '#4287f5', '#ba296d', '#00baa4', '#c26e00', '#ba0003', '#7900c4', '#c4007f', '#a1d602', '#3302d6', '#00d692', '#0052d6', '#06bf25', '#bf3e06'];
export const AddLabelColorSelector: React.FC<{
    defaultActive?: string | null;
    onClick?: (color: string | null) => void;
}> = ({ defaultActive, onClick }) => {
    const [active, setActive] = useState(defaultActive);

    return(
        <div className={styles['color-list']}>
            {DEFAULT_COLORS.map(color => (
                <button 
                    style={{ backgroundColor: color ? color : undefined }}
                    onClick={() => {
                        setActive(color);
                        if(onClick) onClick(color);
                    }}
                    className={styles['color']} 
                    aria-label="Select color"
                    key={color}
                >
                    {color === active && (
                        <CheckIcon />
                    )}
                </button>
            ))}
        </div>
    )
}