import React from 'react';
import styles from './Group.module.scss';
import { usePortal } from '@/contexts/portal';
import { TaskPortal } from '@/portals/task';
import { useBlock } from './GroupBlock';
import { GroupTaskContent } from './GroupTaskContent';
import { GroupTaskHeader } from './GroupTaskHeader';
import { GroupTaskLabels } from './GroupTaskLabels';

const TaskContext = React.createContext({} as {
    taskId: number;
});

export const useTask = () => React.useContext(TaskContext);

export const GroupTask = React.memo<{
    taskId: number;
}>(({ taskId }) => {
    const { setPortal } = usePortal();
    const { blockId, groupId } = useBlock();

    const viewTask = (e: React.MouseEvent) => {        
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
            <div 
                onClick={viewTask} 
                className={styles['task-main']}
            >
                <GroupTaskHeader />
                <GroupTaskContent />
                <GroupTaskLabels />
            </div>
        </TaskContext.Provider>
    )
});