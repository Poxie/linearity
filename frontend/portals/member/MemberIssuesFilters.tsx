import { CloseIcon } from '@/assets/icons/CloseIcon';
import { FilterIcon } from '@/assets/icons/FilterIcon';
import { usePopout } from '@/contexts/popout';
import { TeamItems } from '@/popouts/team-items/TeamItems';
import { Label } from '@/types';
import { useRef } from 'react';
import styles from './MemberPortal.module.scss';

export const MemberIssuesFilters: React.FC<{
    teamId: number;
    label: Label | null;
    setLabel: (label: Label | null) => void;
}> = ({ label, setLabel, teamId }) => {
    const { setPopout } = usePopout();

    const ref = useRef<HTMLButtonElement>(null);

    const openPopout = () => setPopout({
        popout: (
            <TeamItems 
                teamId={teamId}
                type={'labels'}
                onSelect={item => setLabel(item as Label)}
                closeOnSelect
            />
        ),
        position: 'left',
        ref
    })

    return(
        <div className={styles['filters']}>
            <div className={styles['filters-main']}>
                <FilterIcon />
                <span>
                    Filters
                </span>
            </div>
            {!label ? (
                <button 
                    className={styles['empty-filter']}
                    onClick={openPopout}
                    ref={ref}
                >
                    Filter by label
                </button>
            ) : (
                <div className={styles['label']}>
                    <button
                        onClick={openPopout}
                        ref={ref}
                    >
                        <div 
                            className={styles['label-dot']}
                            style={label.color ? { backgroundColor: label.color } : undefined}
                        />
                        {label.name}
                    </button>

                    <button onClick={() => setLabel(null)}>
                        <CloseIcon />
                    </button>
                </div>
            )}
        </div>
    )
}