import React from 'react';
import styles from './Group.module.scss';
import { GroupTaskContent } from './GroupTaskContent';
import { GroupTaskHeader } from './GroupTaskHeader';

const TaskContext = React.createContext({} as {
    taskId: number;
});

export const useTask = () => React.useContext(TaskContext);

export const GroupTask: React.FC<{
    taskId: number;
}> = ({ taskId }) => {
    return(
        <TaskContext.Provider value={{ taskId }}>
            <div className={styles['block-task']}>
                <GroupTaskHeader />
                <GroupTaskContent />
            </div>
        </TaskContext.Provider>
    )
}