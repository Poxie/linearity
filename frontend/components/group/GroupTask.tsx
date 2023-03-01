import React, { useRef } from 'react';
import styles from './Group.module.scss';
import { usePortal } from '@/contexts/portal';
import { TaskPortal } from '@/portals/task';
import { useBlock } from './GroupBlock';
import { GroupTaskContent } from './GroupTaskContent';
import { GroupTaskHeader } from './GroupTaskHeader';
import { GroupTaskLabels } from './GroupTaskLabels';
import { MenuGroup, useMenu } from '@/contexts/menu';

const TaskContext = React.createContext({} as {
    taskId: number;
});

export const useTask = () => React.useContext(TaskContext);

export const GroupTask = React.memo<{
    taskId: number;
}>(({ taskId }) => {
    const { setPortal } = usePortal();
    const { blockId, groupId } = useBlock();
    const { setMenu } = useMenu();
    const ref = useRef<HTMLDivElement>(null);

    const viewTask = () => {        
        setPortal(
            <TaskPortal 
                taskId={taskId}
                blockId={blockId}
                groupId={groupId}
            />
        )
    }

    const openMenu = (event: React.MouseEvent) => {
        const groups: MenuGroup[] = [
            [
                { text: 'View task', onClick: viewTask, type: 'default' }
            ]
        ]
        setMenu({
            groups,
            event,
            element: ref
        })
    }


    return(
        <TaskContext.Provider value={{ taskId }}>
            <div 
                onClick={viewTask}
                onContextMenu={openMenu}
                className={styles['task-main']}
                ref={ref}
            >
                <GroupTaskHeader />
                <GroupTaskContent />
                <GroupTaskLabels />
            </div>
        </TaskContext.Provider>
    )
});