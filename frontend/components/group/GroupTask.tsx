import { usePortal } from '@/contexts/portal';
import { TaskPortal } from '@/portals/task';
import React, { RefObject, useRef } from 'react';
import { usePosition } from '.';
import styles from './Group.module.scss';
import { useBlock } from './GroupBlock';
import { GroupTaskContent } from './GroupTaskContent';
import { GroupTaskHeader } from './GroupTaskHeader';
import { GroupTaskLabels } from './GroupTaskLabels';

const TaskContext = React.createContext({} as {
    taskId: number;
});

export const useTask = () => React.useContext(TaskContext);

const BLOCK_SPACING = 15;
const TASK_PADDING = 15;
export const GroupTask: React.FC<{
    taskId: number;
    index: number;
    container: RefObject<HTMLUListElement>;
}> = ({ taskId, index, container }) => {
    const { setPortal } = usePortal();
    const { blockId, groupId } = useBlock();
    const { updateTaskPosition } = usePosition();
    
    const ref = useRef<HTMLLIElement>(null);
    const initialPos = useRef<null | { top: number, left: number }>(null);
    const currentBlockId = useRef<null | number>(null);
    const currentPosition = useRef<null | number>(null);
    const latestDirection = useRef<'top' | 'bottom'>('top');

    const createPlaceholder = (height: number) => {
        document.querySelector(`.${styles['task-placeholder']}`)?.remove();
        const placeholder = document.createElement('li');
        placeholder.classList.add(styles['task-placeholder']);
        placeholder.style.height = `${height}px`;
        placeholder.style.display = 'grid';
        return placeholder;
    }
    const updatePlaceholderIndex = (index: number) => {
        const placeholder = document.querySelector(`.${styles['task-placeholder']}`);
        if(!placeholder) return;
        (placeholder as HTMLElement).style.order = index.toString();
        currentPosition.current = index;
    }
    const determineDirection = (element: HTMLElement, mouseTop: number) => {
        const { height, top } = element.getBoundingClientRect();
        const middle = top + height / 2;
        const direction = mouseTop > middle ? 'bottom' : 'top';
        latestDirection.current = direction;
        return direction;
    }
    const handleMouseEnter = (e: MouseEvent) => {
        if((e.target as HTMLElement).getAttribute('data-task-id') === taskId.toString()) return;

        const taskIndex = parseInt((e.target as HTMLElement).getAttribute('data-task-index') || '');
        
        const direction = determineDirection(e.target as HTMLElement, e.pageY);
        if(direction === 'top') {
            updatePlaceholderIndex(taskIndex);
        } else {
            updatePlaceholderIndex(taskIndex - 1);
        }
    }
    const onMouseMove = (e: MouseEvent) => {
        if(!ref.current) return;

        const top = e.pageY;
        const left = e.pageX;
        const width = ref.current.offsetWidth;
        const height = ref.current.offsetHeight;
        const { left: elLeft, top: elTop } = ref.current.getBoundingClientRect();

        if(!initialPos.current) {
            initialPos.current = { top: top - elTop, left: left - elLeft };
        }

        const _top = top - initialPos.current.top;
        const _left = left - initialPos.current.left;

        // Checking what block the user is in
        document.querySelectorAll('[data-block-index]').forEach(block => {
            // Checking what block the task should be in
            const blockLeft = block.getBoundingClientRect().left;
            if(_left > blockLeft - (width + BLOCK_SPACING + TASK_PADDING) / 2 && _left < blockLeft + (width + BLOCK_SPACING + TASK_PADDING) / 2) {
                const blockId = parseInt(block.getAttribute('data-block-id') as string);
                if(blockId !== currentBlockId.current) {
                    document.querySelector(`.${styles['task-placeholder']}`)?.remove();
                    const placeholder = createPlaceholder(height);
                    block.childNodes[1].appendChild(placeholder);
                    currentBlockId.current = blockId;
                    if(!document.querySelector(`[data-block-id="${blockId}"] li:not(.${styles['task-placeholder']})`)) {
                        updatePlaceholderIndex(0);
                        console.log('no items')
                    }
                }
            }
        })

        // Checking what child it should be at
        document.querySelectorAll(`[data-block-id="${currentBlockId.current}"]>ul>li:not(.${styles['task-placeholder']})`).forEach((task, key) => {
            (task as HTMLLIElement).style.order = (key + 1).toString();
            (task as HTMLLIElement).removeEventListener('mouseenter', handleMouseEnter);
            (task as HTMLLIElement).addEventListener('mouseenter', handleMouseEnter);
        })

        ref.current.style.position = 'fixed';
        ref.current.style.top = `${_top}px`;
        ref.current.style.left = `${_left}px`;
        ref.current.style.width = `${width}px`;
        ref.current.style.zIndex = '2';
    }
    const onMouseDown = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        if(!container.current || e.button !== 0) return;
        window.addEventListener('mousemove', onMouseMove);
    }
    const onMouseUp = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        if(!ref.current) return;
        
        // Updating task position
        if(currentBlockId.current !== blockId || currentPosition.current !== index) {
            if(!currentPosition.current) currentPosition.current = 0;
            if(currentBlockId.current === null) return;
            updateTaskPosition(
                taskId, 
                blockId, 
                currentBlockId.current, 
                index, 
                currentPosition.current + (
                    latestDirection.current === 'top' && 
                    currentBlockId.current === blockId ? -1 : 0
                )
            );
        }
        reset();
    }
    const reset = () => {
        if(!ref.current) return;
        
        window.removeEventListener('mousemove', onMouseMove);
        document.querySelectorAll(`[data-block-index]>ul>li:not(.${styles['task-placeholder']})`).forEach(task => {
            (task as HTMLLIElement).removeEventListener('mouseenter', handleMouseEnter);
            (task as HTMLLIElement).style.order = 'unset';
        })
        document.querySelector(`.${styles['task-placeholder']}`)?.remove();
        
        ref.current.style.position = 'relative';
        ref.current.style.top = 'unset';
        ref.current.style.left = 'unset';
        ref.current.style.width = 'unset';
        ref.current.style.zIndex = '3';
        initialPos.current = null;
        
        currentBlockId.current = null;
        currentPosition.current = null;
    }

    const viewTask = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {        
        reset();
        setPortal(
            <TaskPortal 
                taskId={taskId}
                blockId={blockId}
                groupId={groupId}
            />
        )
    }

    return(
        <TaskContext.Provider value={{ taskId }}>
            <li 
                className={styles['block-task']}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                data-task-index={index + 1}
                data-task-id={taskId}
                onClick={viewTask}
                ref={ref}
            >
                <GroupTaskHeader />
                <GroupTaskContent />
                <GroupTaskLabels />
            </li>
        </TaskContext.Provider>
    )
}