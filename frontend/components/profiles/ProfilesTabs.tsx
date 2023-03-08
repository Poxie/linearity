import { ProfileTab } from '.';
import styles from './Profiles.module.scss';

const TABS: { text: string, id: ProfileTab }[] = [
    { text: 'User Profile', id: 'USER_PROFILE' },
    { text: 'Server Profiles', id: 'SERVER_PROFILES' }
];
export const ProfilesTabs: React.FC<{
    setTab: (key: ProfileTab) => void;
    activeTab: ProfileTab;
}> = ({ activeTab, setTab }) => {
    return(
        <ul className={styles['tabs']}>
            {TABS.map(tab => {
                const className = [
                    styles['tab'],
                    tab.id === activeTab ? styles['active'] : ''
                ].join(' ');
                return(
                    <li key={tab.text}>
                        <button 
                            className={className}
                            onClick={() => setTab(tab.id)}
                        >
                            {tab.text}
                        </button>
                    </li>
                )
            })}
        </ul>
    )
}