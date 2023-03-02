import styles from './Group.module.scss';
import { useAppSelector } from "@/redux/store";
import { selectBlockInfo, selectBlockTaskCount } from "@/redux/teams/selectors";
import { useBlock } from "./GroupBlock"
import { MenuGroup, useMenu } from '@/contexts/menu';
import { useRef } from 'react';
import { useModal } from '@/contexts/modal';
import { EditBlockModal } from '@/modals/edit-block/EditBlockModal';
import { AddTaskModal } from '@/modals/add-task/AddTaskModal';

export const GroupBlockHeader: React.FC<{
    onMouseUp: () => void;
    onMouseDown: () => void;
}> = ({ onMouseDown, onMouseUp }) => {
    const { setMenu } = useMenu();
    const { setModal } = useModal();
    const { blockId, groupId } = useBlock();

    const { name } = useAppSelector(state => selectBlockInfo(state, blockId));
    const taskCount = useAppSelector(state => selectBlockTaskCount(state, blockId));

    const ref = useRef<HTMLDivElement>(null);

    const addIssue = () => {
        setModal(<AddTaskModal blockId={blockId} />);
    }
    const editBlock = () => {
        setModal(<EditBlockModal blockId={blockId} />)
    }
    const openMenu = (e: React.MouseEvent) => {
        const groups: MenuGroup[] = [
            [
                { text: 'Edit block', onClick: editBlock, type: 'default' },
                { text: 'Add issue', onClick: addIssue, type: 'default' }
            ]
        ]

        setMenu({
            groups,
            event: e,
            element: ref,
        })
    }

    return(
        <div 
            className={styles['block-header']}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onContextMenu={openMenu}
            ref={ref}
        >
            <div className={styles['block-header-main']}>
                <span className={styles['block-title']}>
                    {name}
                </span>
                <span className={styles['task-count']}>
                    {taskCount} issue{(taskCount ?? Infinity) === 1 ? '' :'s'}
                </span>
            </div>
        </div>
    )
}