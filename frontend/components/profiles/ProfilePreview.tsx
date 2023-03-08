import styles from './Profiles.module.scss';
import { useProfile } from './UserProfile';

export const ProfilePreview = () => {
    const { profile: { name, bio } } = useProfile();

    return(
        <div className={styles['preview']}>
            <div className={styles['preview-content']}>
                <div className={styles['preview-banner']}>

                </div>
                <div className={styles['preview-main']}>
                    <div className={styles['preview-icon']}>
                        {name[0]?.toUpperCase()}
                    </div>
                    <div className={styles['preview-text']}>
                        <span className={styles['preview-name']}>
                            {name}
                        </span>
                        <span className={styles['preview-bio']}>
                            {bio || `${name} has no bio`}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}