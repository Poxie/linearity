import styles from './Sidebar.module.scss';
import { SidebarCreateIssue } from './SidebarCreateIssue';
import { SidebarTeams } from "./SidebarTeams";

export const Sidebar = () => {
    return(
        <nav className={styles['container']}>
            <SidebarCreateIssue />
            <SidebarTeams />
        </nav>
    )
}