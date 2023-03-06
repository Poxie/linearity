import { MemberPortalSection } from './MemberPortal';
import styles from './MemberPortal.module.scss';

const TABS: { id: MemberPortalSection, text: string }[] = [
    { id: 'MEMBER_ISSUES', text: 'Issues' },
    { id: 'MEMBER_ACTIVITY', text: 'Activity' }
];
export const MemberPortalTabs: React.FC<{
    setSection: (section: MemberPortalSection) => void;
    section: MemberPortalSection;
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