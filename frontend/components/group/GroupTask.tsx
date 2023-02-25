import React from 'react';
import styles from './Group.module.scss';
import { GroupTaskContent } from './GroupTaskContent';
import { GroupTaskHeader } from './GroupTaskHeader';
import { GroupTaskLabels } from './GroupTaskLabels';

const TaskContext = React.createContext({} as {
    taskId: number;
});

export const useTask = () => React.useContext(TaskContext);

export const GroupTask: React.FC<{
    taskId: number;
}> = ({ taskId }) => {
    return(
        <TaskContext.Provider value={{ taskId }}>
            <li className={styles['block-task']}>
                <GroupTaskHeader />
                <GroupTaskContent />
                <GroupTaskLabels />
            </li>
        </TaskContext.Provider>
    )
}