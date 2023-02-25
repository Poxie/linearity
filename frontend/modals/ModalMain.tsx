import styles from './Modals.module.scss';
import { ReactElement } from "react"

export const ModalMain: React.FC<{
    children: ReactElement | ReactElement[];
    className?: string;
}> = ({ children, className }) => {
    className = [
        styles['main'],
        className
    ].join(' ');
    return(
        <div className={className}>
            {children}
        </div>
    )
}