import { PopoutArgs, usePopout } from '@/contexts/popout';
import { TimeSelectorPopout } from '@/popouts/time-selector/TimeSelectorPopout';
import { useRef, useState } from 'react';
import styles from './TimeSelector.module.scss';

const readableTime = (date: Date) => {
    return date.toLocaleString('en', { dateStyle: 'long', timeStyle: 'short' });
}

export const TimeSeletor: React.FC<{
    onChange: (timestamp: null | Date) => void;
    defaultTime?: number | null;
    emptyLabel?: string;
    popoutPosition?: PopoutArgs['position'];
    className?: string;
}> = ({ defaultTime, onChange, emptyLabel, popoutPosition, className }) => {
    const { setPopout } = usePopout();

    const [date, setDate] = useState<null | Date>(defaultTime ? new Date(defaultTime) : null);
    const ref = useRef<HTMLButtonElement>(null);

    const openPopout = () => {
        setPopout({
            popout: (
                <TimeSelectorPopout 
                    onChange={date => {
                        setDate(date);
                        onChange(date);
                    }} 
                    closeOnSelect 
                />
            ),
            position: popoutPosition,
            ref
        })
    }

    className = [
        styles['container'],
        className
    ].join(' ');
    return(
        <button 
            className={className}
            onClick={openPopout}
            ref={ref}
        >
            {!date ? emptyLabel : readableTime(date)}
        </button>
    )
}