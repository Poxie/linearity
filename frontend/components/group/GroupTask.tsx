import React, { useRef } from 'react';
import styles from './Group.module.scss';
import { GroupTaskContent } from './GroupTaskContent';
import { GroupTaskHeader } from './GroupTaskHeader';
import { GroupTaskLabels } from './GroupTaskLabels';
import { MenuGroup, useMenu } from '@/contexts/menu';
import { useModal } from '@/contexts/modal';
import { EditTaskModal } from '@/modals/edit-task/EditTaskModal';
import { GroupTaskFooter } from './GroupTaskFooter';
import { GroupTaskButton } from './GroupTaskButton';

const TaskContext = React.createContext({} as {
    taskId: number;
});

export const useTask = () => React.useContext(TaskContext);

export const GroupTask = React.memo<{
    taskId: number;
}>(({ taskId }) => {
    const { setModal } = useModal();
    const { setMenu } = useMenu();
    const ref = useRef<HTMLDivElement>(null);

    const openMenu = (event: React.MouseEvent) => {
        const groups: MenuGroup[] = [
            [
                { text: 'View task', onClick: () => setModal(<EditTaskModal taskId={taskId} />), type: 'default' }
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
                onContextMenu={openMenu}
                className={styles['task-main']}
                ref={ref}
            >
                <GroupTaskButton />
                <GroupTaskLabels />
                <GroupTaskHeader />
                <GroupTaskContent />
                <GroupTaskFooter />
            </div>
        </TaskContext.Provider>
    )
});
GroupTask.displayName = 'GroupTask';