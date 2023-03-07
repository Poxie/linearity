import styles from './UserSettingsSidebar.module.scss';
import { SidebarGroup as SidebarGroupType } from ".";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const SidebarGroup: React.FC<{
    header: string;
    items: SidebarGroupType['items'];
}> = ({ header, items }) => {
    const pathname = usePathname();
    
    return(
        <div className={styles['group']}>
            <span className={styles['group-header']}>
                {header}
            </span>
            {items.map(item => {
                const path = `/settings${item.path}`;

                const active = (pathname?.startsWith(path) && item.path) || (path === pathname);
                const className = [
                    styles['item'],
                    active ? styles['active'] : ''
                ].join(' ');
                return(
                    <li key={item.path}>
                        <Link 
                            href={`/settings${item.path}`}
                            className={className}
                        >
                            {item.text}
                        </Link>
                    </li>
                )
            })}
        </div>
    )
}