"use client";

import styles from './Profiles.module.scss';
import { useState } from "react"
import { ProfilesTabs } from "./ProfilesTabs"
import { UserProfile } from './UserProfile';

export type ProfileTab = 'USER_PROFILE' | 'SERVER_PROFILES';
const DEFAULT_TAB = 'USER_PROFILE';

export const Profiles = () => {
    const [tab, setTab] = useState<ProfileTab>(DEFAULT_TAB);
    
    const component = tab === 'USER_PROFILE' ? <UserProfile /> : null;
    return(
        <div className={styles['container']}>
            <ProfilesTabs 
                setTab={setTab}
                activeTab={tab}
            />
            {component}
        </div>
    )
}