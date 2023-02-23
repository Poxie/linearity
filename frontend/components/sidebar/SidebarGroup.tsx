import { useState } from 'react';
import styles from './Sidebar.module.scss';

export const SidebarGroup: React.FC<{
    header: string;
    children: any;
}> = ({ header, children }) => {
    const [expanded, setExpanded] = useState(true);

    const toggleExpanded = () => setExpanded(!expanded);

    const className = [
        styles['group'],
        !expanded ? styles['collapsed'] : ''
    ].join(' ');
    return(
        <div className={className}>
            <button 
                className={styles['group-header']}
                onClick={toggleExpanded}
            >
                {header}
            </button>
            {expanded && children}
        </div>
    )
}