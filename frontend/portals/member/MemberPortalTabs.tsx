import styles from './MemberPortal.module.scss';

const TABS = [
    { id: 'MEMBER_ACTIVITY', text: 'Activity' }, 
    { id: 'MEMBER_ISSUES', text: 'Issues' }
];
export const MemberPortalTabs: React.FC<{
    setSection: (section: string) => void;
    section: string;
}> = ({ setSection, section }) => {
    return(
        <ul className={styles['tabs']}>
            {TABS.map(tab => {
                const active = tab.id === section;
                return(
                    <li key={tab.id}>
                        <button 
                            onClick={() => setSection(tab.id)}
                            className={active ? styles['active'] : ''}
                        >
                            {tab.text}
                        </button>
                    </li>
                )
            })}
        </ul>
    )
}