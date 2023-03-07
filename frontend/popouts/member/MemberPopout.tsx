import styles from './MemberPopout.module.scss';
import { useAppSelector } from "@/redux/store";
import { selectMemberById } from "@/redux/teams/selectors";

export const MemberPopout: React.FC<{
    teamId: number;
    userId: number;
}> = ({ teamId, userId }) => {
    const member = useAppSelector(state => selectMemberById(state, teamId, userId));

    return(
        <div className={styles['container']}>
            <div className={styles['main']}>
                <div className={styles['icon']}>
                    {member?.name[0].toUpperCase()}
                </div>
                <div className={styles['text']}>
                    <span>
                        {member?.name}
                    </span>
                    <span className={styles['bio']}>
                        This user has no bio
                    </span>
                </div>
            </div>
        </div>
    )
}