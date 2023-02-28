import React from 'react';
import styles from './Group.module.scss';
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { selectAllPositionedTasks, selectPositionedBlocks } from "@/redux/teams/selectors";
import { GroupBlock } from "./GroupBlock";
import { updateBlockPositions, updateTaskPositions, updateTaskPositionsAndBlocks } from '@/redux/teams/actions';
import { useAuth } from '@/contexts/auth';

type PositionContextType = {
    updateBlockPosition: (blockId: number, prevPosition: number, position: number) => void;
    updateTaskPosition: (taskId: number, prevBlockId: number, newBlockId: number, prevPosition: number, newPosition: number) => void;
}
const PositionContext = React.createContext({} as PositionContextType);

export const usePosition = () => React.useContext(PositionContext);

export const Group: React.FC<{
    groupId: number;
    teamId: number;
}> = ({ groupId, teamId }) => {
    const { patch } = useAuth();

    const blocks = useAppSelector(state => selectPositionedBlocks(state, groupId));
    const tasks = useAppSelector(selectAllPositionedTasks);
    const dispatch = useAppDispatch();

    const updateBlockPosition: PositionContextType['updateBlockPosition'] = (blockId, prevPosition, position) => {
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
    const updateTaskPosition: PositionContextType['updateTaskPosition'] = (taskId, prevBlockId, newBlockId, prevPosition, newPosition) => {
        const blockTasks = tasks.filter(task => task.block_id === newBlockId);
        
        console.log(prevBlockId, newBlockId, newPosition);
        if(prevBlockId === newBlockId) {
            const newTasks = blockTasks.map(task => {
                task = {...task}
                
                if(task.id === taskId) {
                    task.position = newPosition < 0 ? 0 : newPosition;
                    return task;
                }
    
                if(task.position >= prevPosition && task.position <= newPosition) {
                    task.position--;
                    return task;
                }
    
                if(task.position <= prevPosition && task.position >= newPosition) {
                    task.position++;
                    return task;
                }
    
                return task;
            })
    
            dispatch(updateTaskPositions(newBlockId, newTasks));
    
            patch(`/blocks/${newBlockId}/tasks`, {
                tasks: newTasks
            }).catch(() => {
                dispatch(updateTaskPositions(newBlockId, blockTasks));
            })
        } else {
            dispatch(updateTaskPositionsAndBlocks(taskId, newBlockId, newPosition));

            patch(`/tasks/${taskId}`, {
                block_id: newBlockId,
                position: newPosition
            })
        }
    }
    
    const value = {
        updateBlockPosition,
        updateTaskPosition
    }
    return(
        <PositionContext.Provider value={value}>
            <div className={styles['container']}>
                {blocks?.map(block => (
                    <GroupBlock 
                        id={block.id}
                        groupId={groupId}
                        teamId={teamId}
                        index={block.position}
                        key={block.id}
                    />
                ))}
            </div>
        </PositionContext.Provider>
    )
}