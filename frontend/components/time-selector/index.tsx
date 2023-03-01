import { usePopout } from '@/contexts/popout';
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
}> = ({ defaultTime, onChange, emptyLabel }) => {
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
            ref
        })
    }

    return(
        <button 
            className={styles['container']}
            onClick={openPopout}
            ref={ref}
        >
            {!date ? emptyLabel : readableTime(date)}
        </button>
    )
}