import { ArrowIcon } from '@/assets/icons/ArrowIcon';
import Button from '@/components/button';
import { usePopout } from '@/contexts/popout';
import { useEffect, useState } from 'react';
import styles from './TeamSelectorPopout.module.scss';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const DEFAULT_HOUR = 23;
const DEFAULT_MINUTE = 59;
const INITIAL_DATE = {
    day: null,
    month: null,
    year: null,
    hour: DEFAULT_HOUR,
    minute: DEFAULT_MINUTE
}

const daysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
}
const getFirstDayOfMonth = (month: number, year: number) => {
    return DAYS[new Date(year, month, 0).getDay()];
}
const getLastDayOfMonth = (month: number, year: number) => {
    return DAYS[new Date(year, month + 1, 0).getDay()];
}
const getPreviousDays = (month: number, year: number, firstDayOfMonth: string) => {
    const dayAmount = DAYS.indexOf(firstDayOfMonth);
    
    const monthDayAmount = daysInMonth(month, year);
    const previousDays = [];
    for(let i = monthDayAmount; i > monthDayAmount - dayAmount; i--) {
        previousDays.push(i);
    }

    return previousDays.sort((a,b) => a - b);
}
const getNextDays = (month: number, year: number, lastDayOfMonth: string) => {
    const dayAmount = DAYS.length - DAYS.indexOf(lastDayOfMonth);
    if(dayAmount === 7) return [];

    const nextDays = [];
    for(let i = 0; i < dayAmount; i++) {
        nextDays.push(i + 1);
    }
    return nextDays;
}

export const TimeSelectorPopout: React.FC<{
    onChange: (date: Date | null) => void;
    closeOnSelect?: boolean;
}> = ({ onChange, closeOnSelect }) => {
    const { close } = usePopout();

    const now = new Date();
    const [date, setDate] = useState({
        day: now.getDate(),
        month: now.getMonth(),
        year: now.getFullYear()
    });
    const [activeDate, setActiveDate] = useState<{
        day: null | number;
        month: null | number;
        year: null | number;
        hour: null | number;
        minute: null | number;
    }>(INITIAL_DATE)

    // Ability to go through different months
    const prevMonth = () => {
        setDate(prev => {
            if(prev.month === 0) {
                return {
                    ...prev,
                    month: 11,
                    year: prev.year - 1
                }
            }
            return {
                ...prev,
                month: prev.month - 1
            };
        })
    }
    const nextMonth = () => {
        setDate(prev => {
            if(prev.month === 11) {
                return {
                    ...prev,
                    month: 0,
                    year: prev.year + 1
                }
            }
            return {
                ...prev,
                month: prev.month + 1
            };
        })
    }

    // If all criteria are met, run onChange
    useEffect(() => {
        if(Object.values(activeDate).find(value => value === null) === null) return;

        const date = new Date()
        date.setFullYear(activeDate.year as number)
        date.setMonth(activeDate.month as number);
        date.setDate(activeDate.day as number);
        date.setHours(activeDate.hour as number);
        date.setMinutes(activeDate.minute as number);

        onChange(date);
        if(closeOnSelect) close();
    }, [activeDate]);

    // Updating active time
    const onTimeChange = (type: 'hour' | 'minute', value: number) => {
        if(type === 'hour' && value > 24) value = DEFAULT_HOUR;
        if((type === 'hour' || type === 'minute') && value < 0) value = 1;
        if(type === 'hour' && !value && value !== 0) value = DEFAULT_HOUR;
        if(type === 'hour' && value === 0) value = 24;
        if(type === 'minute' && !value) value = DEFAULT_MINUTE;
        if(type === 'minute' && value >= 60) value = DEFAULT_MINUTE;

        setActiveDate(prev => ({
            ...prev,
            [type]: value
        }))
    }
    // Updating active date
    const onDateClick = (dateNumber: number) => {
        setActiveDate(prev => ({
            ...prev,
            month: date.month,
            year: date.year,
            day: dateNumber
        }))
    }
    // Resetting date
    const reset = () => {
        setActiveDate(INITIAL_DATE);
        onChange(null);
        if(closeOnSelect) close();
    }

    const { month, year } = date;

    const days = daysInMonth(month + 1, year);
    const firstDayOfMonth = getFirstDayOfMonth(month, year);
    const lastDayOfMonth = getLastDayOfMonth(month, year);

    const previousDays = getPreviousDays(month, year, firstDayOfMonth);
    const nextDays = getNextDays(month, year, lastDayOfMonth);
    return(
        <div className={styles['container']}>
            <div className={styles['selector']}>
                <button onClick={prevMonth}>
                    <ArrowIcon />
                </button>
                <span>
                    {MONTHS[month]} {year}
                </span>
                <button onClick={nextMonth}>
                    <ArrowIcon style={{ transform: 'rotate(180deg)' }} />
                </button>
            </div>
            <div className={styles['header']}>
                {DAYS.map(day => (
                    <span key={day}>
                        {day.slice(0,2)}
                    </span>
                ))}
            </div>
            <div className={styles['calendar']}>
                {previousDays.map((day, key) => (
                    <span className={styles['placeholder']} key={`previous-${day}`}>
                        {day}
                    </span>
                ))}

                {Array.from(Array(days)).map((_, key) => (
                    <button 
                        onClick={() => onDateClick(key + 1)}
                        className={styles['date']} 
                        key={key}
                    >
                        {key + 1}
                    </button>
                ))}

                {nextDays.map((day, key) => (
                    <span className={styles['placeholder']} key={`next-${day}`}>
                        {day}
                    </span>
                ))}
            </div>
            <div className={styles['time']}>
                <input 
                    onChange={e => onTimeChange('hour', e.target.valueAsNumber)}
                    type="number" 
                    defaultValue={DEFAULT_HOUR}
                    min="0"
                    max={DEFAULT_HOUR}
                />
                <div className={styles['time-divider']}>
                    <span>
                        :
                    </span>
                </div>
                <input 
                    onChange={e => onTimeChange('minute', e.target.valueAsNumber)}
                    type="number" 
                    defaultValue={DEFAULT_MINUTE}
                    min="0" 
                    max={DEFAULT_MINUTE}
                />
            </div>
            <Button 
                className={styles['button']}
                onClick={reset}
            >
                Reset
            </Button>
        </div>
    )
}