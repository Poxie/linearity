import React from 'react';
import styles from './TaskPortal.module.scss';

type Props = {
    icon: any;
    text: string;
    className?: string;
    onClick?: () => void;
}
export const TaskPortalAssignee = React.forwardRef<HTMLButtonElement, Props>(({ icon, text, className, onClick }, ref) => {
    className = [
        className,
        styles['assignee']
    ].join(' ');
    return(
        <li>
            <button className={className} onClick={onClick} ref={ref}>
                <span className={styles['assignee-icon']}>
                    {icon}
                </span>
                <span className={styles['assignee-text']}>
                    {text}
                </span>
            </button>
        </li>
    )
})