import styles from './Profiles.module.scss';
import { useAppSelector } from "@/redux/store"
import { selectUser } from "@/redux/user/selectors"

export const ProfilePreview = () => {
    const user = useAppSelector(selectUser);
    return(
        <div className={styles['preview']}>
            <div className={styles['preview-content']}>
                <div className={styles['preview-banner']}>
                
                </div>
                <div className={styles['preview-main']}>
                    <div className={styles['preview-icon']}>
                        {user?.name[0].toUpperCase()}
                    </div>
                    <div className={styles['preview-text']}>
                        <span className={styles['preview-name']}>
                            {user?.name}
                        </span>
                        <span className={styles['preview-bio']}>
                            {user?.bio || `${user?.name} has no bio`}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}