import { Team } from "@/types"
import Link from "next/link";
import styles from './TeamSelection.module.scss';

export const TeamSelectionItem: React.FC<{
    team: Team;
}> = ({ team: { id, name, task_count, member_count } }) => {
    return(
        <li>
            <Link href={`/teams/${id}`} className={styles['item']}>
                <span>
                    {name}
                </span>
                <span>
                    {member_count} members
                </span>
                <span>
                    {task_count} issues
                </span>
            </Link>
        </li>
    )
}