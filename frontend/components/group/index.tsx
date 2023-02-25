import { useAppSelector } from "@/redux/store";
import { selectGroupBlockIds } from "@/redux/teams/selectors";

export const Group: React.FC<{
    groupId: number;
}> = ({ groupId }) => {
    const blockIds = useAppSelector(state => selectGroupBlockIds(state, groupId));
    
    return(
        <div>
            {blockIds?.map(blockId => blockId)}
        </div>
    )
}