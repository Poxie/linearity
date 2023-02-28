import styles from './Group.module.scss';
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { selectPositionedBlocks } from "@/redux/teams/selectors";
import { GroupBlock } from "./GroupBlock";
import { updateBlockPositions } from '@/redux/teams/actions';
import { useAuth } from '@/contexts/auth';

export const Group: React.FC<{
    groupId: number;
    teamId: number;
}> = ({ groupId, teamId }) => {
    const { patch } = useAuth();

    const blocks = useAppSelector(state => selectPositionedBlocks(state, groupId));
    const dispatch = useAppDispatch();

    const updateBlockPosition = (blockId: number, prevPosition: number, position: number) => {
        // Determining the new positions of the blocks
        const newBlocks = blocks.map(block => {
            block = {...block};
            if(block.id === blockId) {
                block.position = position;
            } else {
                // If position moves to the right
                if(block.position >= prevPosition && block.position <= position) {
                    block.position--;
                }
                // If position moves to the left
                if(block.position <= prevPosition && block.position >= position) {
                    block.position++;
                }
            }
            return block;
        })

        // Updating redux's block positions
        dispatch(updateBlockPositions(newBlocks));

        // Updating block positions
        patch(`/groups/${groupId}/blocks`, {
            blocks: newBlocks
        }).catch(() => {
            // If update fails, return to previous positions
            dispatch(updateBlockPositions(blocks));
        })
    }
    
    return(
        <div className={styles['container']}>
            {blocks?.map(block => (
                <GroupBlock 
                    id={block.id}
                    groupId={groupId}
                    teamId={teamId}
                    index={block.position}
                    updateBlockPosition={updateBlockPosition}
                    key={block.id}
                />
            ))}
        </div>
    )
}