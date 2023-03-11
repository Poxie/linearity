import styles from './Navbar.module.scss';
import { useAppSelector } from "@/redux/store"
import { selectUser } from "@/redux/user/selectors"
import { UserAvatar } from "../user-avatar"
import { UserSettingsPopout } from '@/popouts/user-settings';
import { useRef } from 'react';
import { MenuGroup, useMenu } from '@/contexts/menu';
import { useRouter } from 'next/router';

export const NavbarTabs = () => {
    const { push } = useRouter();
    const { setMenu } = useMenu();
    const user = useAppSelector(selectUser);

    const ref = useRef<HTMLButtonElement>(null);
    
    if(!user) return null;

    const openPopout = (event: React.MouseEvent) => {
        const groups: MenuGroup[] = [
            [
                { text: 'Settings', onClick: () => push(`/settings`), type: 'default' }
            ]
        ]
        setMenu({
            groups,
            event,
            element: ref
        })
    }

    return(
        <button 
            className={styles['user']} 
            onClick={openPopout}
            ref={ref}
        >
            <UserAvatar
                className={styles['user-avatar']} 
                avatar={user.avatar}
                name={user.name}
                round
            />
            <span>
                {user.name}
            </span>
        </button>
    )
}