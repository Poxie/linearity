import { EditProfile } from './EditProfile';
import { ProfilePreview } from './ProfilePreview';
import styles from './Profiles.module.scss';

export const UserProfile = () => {
    return(
        <div className={styles['content']}>
            <EditProfile />
            <ProfilePreview />
        </div>
    )
}