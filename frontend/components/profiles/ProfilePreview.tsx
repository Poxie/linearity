import styles from './Profiles.module.scss';
import { useProfile } from './UserProfile';

export const ProfilePreview = () => {
    const { profile: { name, bio, avatar } } = useProfile();

    let avatarUrl = avatar ? `${process.env.NEXT_PUBLIC_IMG_ENDPOINT}/avatar/${avatar}` : undefined;
    if(avatar instanceof File) {
        const blob = new Blob([avatar]);
        avatarUrl = URL.createObjectURL(blob);
    }
    return(
        <div className={styles['preview']}>
            <div className={styles['preview-content']}>
                <div className={styles['preview-banner']}>

                </div>
                <div className={styles['preview-main']}>
                    <div 
                        className={styles['preview-avatar']}
                        style={avatarUrl ? { backgroundImage: `url(${avatarUrl})` } : undefined}
                    >
                        {!avatarUrl && name[0]?.toUpperCase()}
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