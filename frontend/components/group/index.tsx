import styles from './Group.module.scss';
import { useAppSelector } from "@/redux/store";
import { selectGroupBlockIds } from "@/redux/teams/selectors";
import { GroupBlock } from "./GroupBlock";

export const Group: React.FC<{
    groupId: number;
    teamId: number;
}> = ({ groupId, teamId }) => {
    const blockIds = useAppSelector(state => selectGroupBlockIds(state, groupId));
    
    return(
        <div className={styles['container']}>
            {blockIds?.map(blockId => (
                <GroupBlock 
                    id={blockId}
                    groupId={groupId}
                    teamId={teamId}
                    key={blockId} 
                />
            ))}
        </div>
    )
}