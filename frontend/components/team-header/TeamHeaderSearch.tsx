import styles from './TeamHeader.module.scss';
import { SearchIcon } from "@/assets/icons/SearchIcon"
import { Input } from "../input"
import { useEffect, useRef, useState } from 'react';
import { TeamHeaderSearchResults } from './TeamHeaderSearchResults';
import { AnimatePresence } from 'framer-motion';

export const TeamHeaderSearch: React.FC<{
    teamId: number;
    name?: string;
}> = ({ name, teamId }) => {
    const [focusing, setFocusing] = useState(false);
    const [search, setSearch] = useState('');
    const ref = useRef<HTMLDivElement>(null);

    // Closing popout on click outside
    useEffect(() => {
        const handleClickOutside = (e: Event) => {
            // @ts-ignore: this works
            if(ref.current && !ref.current.contains(e.target)) {
                setFocusing(false);
            }
        }

        window.addEventListener('mousedown', handleClickOutside);
        return () => window.removeEventListener('mousedown', handleClickOutside)
    }, []);

    return(
        <div 
            className={styles['search-container']}
            ref={ref}
        >
            <Input 
                containerClassName={styles['input']}
                placeholder={`Search in ${name}`}
                icon={<SearchIcon />}
                onFocus={() => setFocusing(true)}
                onChange={setSearch}
            />
            <AnimatePresence>
                {focusing && (
                    <TeamHeaderSearchResults 
                        search={search}
                        teamId={teamId}
                        close={() => setFocusing(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}