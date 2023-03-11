import styles from './MemberPortal.module.scss';
import { useAppSelector } from "@/redux/store";
import { selectMemberById } from "@/redux/teams/selectors";
import { Portal } from "../Portal"
import { ReactElement, useState } from 'react';
import { MemberPortalTabs } from './MemberPortalTabs';
import { MemberPortalIsseus } from './MemberPortalIssues';
import { UserAvatar } from '@/components/user-avatar';

export type MemberPortalSection = 'MEMBER_ISSUES' | 'MEMBER_ACTIVITY';
const DEFAULT_SECTION: MemberPortalSection = 'MEMBER_ISSUES';

export const MemberPortal: React.FC<{
    userId: number;
    teamId: number;
}> = ({ userId, teamId }) => {
    const user = useAppSelector(state => selectMemberById(state, teamId, userId));
    const [section, setSection] = useState<MemberPortalSection>(DEFAULT_SECTION);

    if(!user) return null;

    let component: null | ReactElement = null;
    switch(section) {
        case 'MEMBER_ISSUES':
            component = <MemberPortalIsseus teamId={teamId} memberId={userId} />;
            break;
    }
    return(
        <Portal header={'Member Profile'}>
            <div className={styles['user-header']}>
                <UserAvatar 
                    className={styles['user-avatar']}
                    avatar={user.avatar}
                    name={user.name}
                />
                <div className={styles['user-text']}>
                    <span className={styles['name']}>
                        {user.name}
                    </span>
                    <span className={styles['bio']}>
                        {user.bio || `${user.name} has no bio`}
                    </span>
                </div>
            </div>
            <MemberPortalTabs 
                section={section}
                setSection={setSection}
            />
            {component}
        </Portal>
    )
}