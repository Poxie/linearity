import React, { useRef } from 'react';
import styles from './Group.module.scss';
import { useTask as _useTask } from '@/hooks/useTask';
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
    className?: string;
}>(({ taskId, className }) => {
    const { setModal } = useModal();
    const { setMenu } = useMenu();
    const { removeSelf } = _useTask(taskId);
    const ref = useRef<HTMLDivElement>(null);

    const openMenu = (event: React.MouseEvent) => {
        const groups: MenuGroup[] = [
            [
                { text: 'View task', onClick: () => setModal(<EditTaskModal taskId={taskId} />), type: 'default' }
            ],
            [
                { text: 'Edit task', onClick: () => setModal(<EditTaskModal taskId={taskId} />), type: 'default' },
                { text: 'Delete task', onClick: removeSelf, type: 'danger' }
            ]
        ]
        setMenu({
            groups,
            event,
            element: ref
        })
    }

    className = [
        styles['task-main'],
        className
    ].join(' ');
    return(
        <TaskContext.Provider value={{ taskId }}>
            <div
                onContextMenu={openMenu}
                className={className}
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