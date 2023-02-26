import { Block, Group, Label, Member, Task, Team } from "@/types";
import { AnyAction } from "redux";
import { createReducer, updateItemInArray, updateObject } from "../utils";
import { ADD_BLOCK_TASK, SET_GROUPS, SET_BLOCKS, SET_TEAMS, SET_MEMBERS, SET_LABELS, ADD_TASK_ASSIGNEE, REMOVE_TASK_ASSIGNEE, ADD_TASK_LABEL, REMOVE_TASK_LABEL } from "./constants";
import { TeamsState } from "./types";

// Reducer actions
type ReducerAction = (state: TeamsState, action: AnyAction) => TeamsState;

const setTeams: ReducerAction = (state, action) => {
    const teams: Team[] = action.payload;

    return updateObject(state, {
        teams,
        loading: false
    })
}

const setGroups: ReducerAction = (state, action) => {
    const groups: Group[] = action.payload;

    return updateObject(state, {
        groups
    })
}

const setBlocks: ReducerAction = (state, action) => {
    const blocks: Block[] = action.payload;

    return updateObject(state, {
        blocks
    })
}

const addBlockTask: ReducerAction = (state, action) => {
    const { blockId, task } = action.payload as {
        blockId: number;
        task: Task;
    }

    return updateObject(state, {
        blocks: state.blocks.map(block => {
            if(block.id !== blockId) return block;

            return updateObject(block, {
                tasks: [...block.tasks, ...[task]]
            })
        })
    })
}

const setMembers: ReducerAction = (state, action) => {
    const members: Member[] = action.payload;

    return updateObject(state, {
        members
    })
}

const setLabels: ReducerAction = (state, action) => {
    const labels: Label[] = action.payload;

    return updateObject(state, {
        labels
    })
}

const addTaskLabel: ReducerAction = (state, action) => {
    const blockId: number = action.payload.blockId;
    const taskId: number = action.payload.taskId;
    const label: Label = action.payload.label;

    return updateObject(state, {
        blocks: updateItemInArray(state.blocks, blockId, block => {
            return updateObject(block, {
                tasks: updateItemInArray(
                    block.tasks, 
                    taskId, 
                    task => updateObject(task, {
                        labels: [...task.labels, ...[label]]
                    }
                ))
            })
        })
    })
}

const removeTaskLabel: ReducerAction = (state, action) => {
    const blockId: number = action.payload.blockId;
    const taskId: number = action.payload.taskId;
    const labelId: number = action.payload.labelId;

    return updateObject(state, {
        blocks: updateItemInArray(state.blocks, blockId, block => {
            return updateObject(block, {
                tasks: updateItemInArray(
                    block.tasks, 
                    taskId,
                    task => updateObject(task, {
                        labels: task.labels.filter(label => label.id !== labelId)
                    }
                ))
            })
        })
    })
}

const addTaskAssignee: ReducerAction = (state, action) => {
    const blockId: number = action.payload.blockId;
    const taskId: number = action.payload.taskId;
    const member: Member = action.payload.member;

    return updateObject(state, {
        blocks: updateItemInArray(state.blocks, blockId, block => {
            return updateObject(block, {
                tasks: updateItemInArray(
                    block.tasks, 
                    taskId, 
                    task => updateObject(task, {
                        assignees: [...task.assignees, ...[member]]
                    }
                ))
            })
        })
    })
}

const removeTaskAssignee: ReducerAction = (state, action) => {
    const blockId: number = action.payload.blockId;
    const taskId: number = action.payload.taskId;
    const memberId: number = action.payload.memberId;

    return updateObject(state, {
        blocks: updateItemInArray(state.blocks, blockId, block => {
            return updateObject(block, {
                tasks: updateItemInArray(
                    block.tasks, 
                    taskId, 
                    task => updateObject(task, {
                        assignees: task.assignees.filter(assignee => assignee.id !== memberId)
                    }
                ))
            })
        })
    })
}

// Creating reducer
export const teamsReducer = createReducer({
    teams: [],
    groups: [],
    blocks: [],
    members: [],
    labels: [],
    loading: true
}, {
    [SET_TEAMS]: setTeams,
    [SET_MEMBERS]: setMembers,
    [SET_LABELS]: setLabels,
    [SET_GROUPS]: setGroups,
    [SET_BLOCKS]: setBlocks,
    [ADD_BLOCK_TASK]: addBlockTask,
    [ADD_TASK_ASSIGNEE]: addTaskAssignee,
    [REMOVE_TASK_ASSIGNEE]: removeTaskAssignee,
    [ADD_TASK_LABEL]: addTaskLabel,
    [REMOVE_TASK_LABEL]: removeTaskLabel
})