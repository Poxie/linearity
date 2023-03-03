import { useEffect, useRef, useState } from 'react';
import { Input } from '../input';
import styles from './Dropdown.module.scss';

export const Dropdown: React.FC<{
    items: {id: number, text: string}[];
    onChange: (id: number) => void;
    defaultSelected?: number;
    allowSearch?: boolean;
    className?: string;
    resultsPosition?: 'left' | 'center' | 'right';
}> = ({ items, onChange, defaultSelected, allowSearch, className, resultsPosition='left' }) => {
    const [selected, setSelected] = useState(defaultSelected || items[0].id);
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Selecting new item
    const selectItem = (id: number) => {
        setSelected(id);
        onChange(id);
        setOpen(false);
        setSearch('');
    }

    // Closing on click outside component
    const checkForClickOutside = (e: MouseEvent) => {
        // @ts-ignore: this works
        if(ref.current && !ref.current.contains(e.target)) {
            setOpen(false);
        }
    }
    useEffect(() => {
        document.addEventListener('mousedown', checkForClickOutside);
        return () => document.removeEventListener('mousedown', checkForClickOutside);
    }, []);

    const selectableItems = !search ? items : items.filter(item => item.text.toLowerCase().includes(search.toLowerCase()));
    const selectedItem = items.find(item => item.id === selected);

    className = [
        className,
        styles['container'],
        styles[resultsPosition]
    ].join(' ')
    return(
        <div className={className} ref={ref}>
            <button 
                className={styles['selected']}
                onClick={() => setOpen(!open)}
                type="button"
            >
                {selectedItem?.text}
            </button>

            {open && (
                <ul>
                    {allowSearch && (
                        <Input 
                            placeholder={'Search'}
                            name="search"
                            containerClassName={styles['search']}
                            onChange={setSearch}
                        />
                    )}
                    {selectableItems.map(item => (
                        <li key={item.id}>
                            <button 
                                onClick={() => selectItem(item.id)}
                                type="button"
                            >
                                {item.text}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}