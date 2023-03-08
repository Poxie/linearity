import styles from './StatusMessage.module.scss';
import { ReactElement } from "react";

export const StatusMessage: React.FC<{
    message: string;
    icon?: ReactElement;
    type?: 'danger' | 'success' | 'info';
}> = ({ message, icon, type='info' }) => {
    const className = [
        styles['container'],
        styles[type]
    ].join(' ');
    return(
        <div className={className}>
            {icon}
            <span>
                {message}
            </span>
        </div>
    )
}