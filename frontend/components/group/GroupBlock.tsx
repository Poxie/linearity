import React from 'react';
import styles from './Group.module.scss';
import { GroupAddTask } from './GroupAddTask';
import { GroupBlockHeader } from './GroupBlockHeader';
import { GroupTasks } from './GroupTasks';

const BlockContext = React.createContext({} as {
    groupId: number;
    blockId: number;
});

export const useBlock = () => React.useContext(BlockContext);

export const GroupBlock: React.FC<{
    id: number;
    groupId: number;
}> = ({ id, groupId }) => {
    const value = {
        blockId: id,
        groupId
    }
    return(
        <BlockContext.Provider value={value}>
            <div className={styles['block']}>
                <GroupBlockHeader />
                <div className={styles['block-content']}>
                    <GroupTasks />
                    <GroupAddTask />
                </div>
            </div>
        </BlockContext.Provider>
    )
}