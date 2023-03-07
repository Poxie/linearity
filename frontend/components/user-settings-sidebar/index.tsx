"use client";

import { SidebarGroup } from './SidebarGroup';
import styles from './UserSettingsSidebar.module.scss';

export type SidebarGroup = typeof GROUPS[0];
const GROUPS = [
    { header: 'User Settings', items: [
        { text: 'Account', path: '' },
        { text: 'Profiles', path: '/profiles' }
    ] },
    { header: 'App Settings', items: [
        { text: 'Appearance', path: '/appearance' }
    ] }
]
export const UserSettingsSidebar = () => {
    return(
        <ul className={styles['container']}>
            {GROUPS.map(group => (
                <SidebarGroup
                    header={group.header}
                    items={group.items}
                    key={group.header}
                />
            ))}
        </ul>
    )
}