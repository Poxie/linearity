import { CreateIssueIcon } from "@/assets/icons/CreateIssueIcon";
import Button from "../button"
import styles from './Sidebar.module.scss';

export const SidebarCreateIssue = () => {
    return(
        <Button 
            icon={<CreateIssueIcon />}
            className={styles['create-issue-button']}
        >
            Create New Issue
        </Button>
    )
}