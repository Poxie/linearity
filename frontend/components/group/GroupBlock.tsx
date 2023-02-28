import React, { useEffect, useRef, useState } from 'react';
import styles from './Group.module.scss';
import { GroupAddTask } from './GroupAddTask';
import { GroupBlockHeader } from './GroupBlockHeader';
import { GroupTasks } from './GroupTasks';

const BlockContext = React.createContext({} as {
    groupId: number;
    blockId: number;
    teamId: number;
});

export const useBlock = () => React.useContext(BlockContext);

const BLOCK_SPACING = 15;
export const GroupBlock: React.FC<{
    id: number;
    groupId: number;
    teamId: number;
    index: number;
    updateBlockPosition: (blockId: number, prevPosition: number, position: number) => void;
}> = ({ id, groupId, teamId, index, updateBlockPosition }) => {
    const ref = useRef<HTMLDivElement>(null);
    const initialPos = useRef<null | { top: number, left: number }>(null);
    const newIndex = useRef<null | number>(null);

    // Resetting position related data on position change
    useEffect(() => {
        if(!ref.current) return;
        ref.current.style.transform = '';
        ref.current.style.zIndex = '';
        newIndex.current = null;
        initialPos.current = null;
    }, [index]);

    const onMouseMove = (e: MouseEvent) => {
        if(!ref.current) return;

        const top = e.pageY;
        const left = e.pageX;
        const width = ref.current.offsetWidth;

        if(!initialPos.current) {
            initialPos.current = { top, left };
        }

        const _top = top - initialPos.current.top;
        const _left = left - initialPos.current.left;

        ref.current.style.transform = `translateX(${_left}px) translateY(${_top}px)`;
        ref.current.style.zIndex = '1000';

        // Checking if mouse overlaps other block's dimensions
        document.querySelectorAll('[data-block-index]').forEach(block => {
            // Checking if block is the block being dragged. If so, return
            const blockIndex = parseInt(block.getAttribute('data-block-index') || '');
            if(blockIndex === index) return;

            // Getting the left position of the block, checking if it is within mouse threshold
            const _left = block.getBoundingClientRect().left;
            if(Math.abs(left - _left) >= width + BLOCK_SPACING) return;

            // If block is after current block, move it backwards
            if(blockIndex > index) {
                if(_left + width / 2 <= left) {
                    // @ts-ignore
                    block.style.transform = `translateX(-${width + BLOCK_SPACING}px)`;
                    newIndex.current = blockIndex;
                } else {
                    // @ts-ignore
                    block.style.transform = `translateX(0)`;
                    newIndex.current = blockIndex - 1;
                }
            } 
            // Else move the block forwards
            else {
                if(_left + width / 2 >= left) {
                    // @ts-ignore
                    block.style.transform = `translateX(${width + BLOCK_SPACING}px)`;
                    newIndex.current = blockIndex;
                } else {
                    // @ts-ignore
                    block.style.transform = `translateX(0)`;
                    newIndex.current = blockIndex + 1;
                }
            }
        })
    }
    // Function to start the listening of mouse move
    const onMouseDown = () => {
        if(!ref.current) return;
        window.addEventListener('mousemove', onMouseMove);
    }
    // Function to stop the listening of mouse move, checking if positions should update
    const onMouseUp = () => {
        if(!ref.current) return;
        window.removeEventListener('mousemove', onMouseMove);
        initialPos.current = null;
        
        if(newIndex.current !== null && newIndex.current !== index) {
            updateBlockPosition(id, index, newIndex.current)
        } else {
            ref.current.style.transform = '';
            ref.current.style.zIndex = '';
            newIndex.current = null;
        }
    }

    const value = {
        blockId: id,
        teamId,
        groupId
    }
    return(
        <BlockContext.Provider value={value}>
            <div 
                className={styles['block']}
                data-block-index={index}
                ref={ref}
            >
                <GroupBlockHeader 
                    onMouseDown={onMouseDown}
                    onMouseUp={onMouseUp}
                />
                <GroupTasks />
                <GroupAddTask />
            </div>
        </BlockContext.Provider>
    )
}