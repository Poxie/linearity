import React from 'react';
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

export const GroupBlock: React.FC<{
    id: number;
    groupId: number;
    teamId: number;
}> = ({ id, groupId, teamId }) => {
    const value = {
        blockId: id,
        teamId,
        groupId
    }
    return(
        <BlockContext.Provider value={value}>
            <div className={styles['block']}>
                <GroupBlockHeader />
                <GroupTasks />
                <GroupAddTask />
            </div>
        </BlockContext.Provider>
    )
}