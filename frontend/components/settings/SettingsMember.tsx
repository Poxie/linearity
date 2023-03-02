import styles from './Settings.module.scss';
import { useAppSelector } from "@/redux/store";
import { selectMemberById } from "@/redux/teams/selectors";

export const SettingsMember: React.FC<{
    memberId: number;
    teamId: number;
}> = ({ memberId, teamId }) => {
    const member = useAppSelector(state => selectMemberById(state, teamId, memberId));
    
    return(
        <div className={styles['member']}>
            <div className={styles['member-icon']}>
                {member?.name[0]}
            </div>
            <span className={styles['member-name']}>
                {member?.name}
            </span>
        </div>
    )
}