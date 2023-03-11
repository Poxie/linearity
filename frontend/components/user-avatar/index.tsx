import styles from './UserAvatar.module.scss';
import { User } from "@/types"

export const UserAvatar: React.FC<{
    avatar: User['avatar'];
    name: User['name'];
    className?: string;
    round?: boolean;
}> = ({ className, avatar, name, round }) => {
    className = [
        styles['container'],
        round ? styles['round'] : '',
        className
    ].join(' ');
    return(
        <div 
            className={className}
            style={avatar ? { backgroundImage: `url(${process.env.NEXT_PUBLIC_IMG_ENDPOINT}/avatar/${avatar})` } : undefined}
        >
            {!avatar && name[0].toUpperCase()}
        </div>
    )
}