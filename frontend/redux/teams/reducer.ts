import { Block, Group, Label, Member, Task, Team } from "@/types";
import { AnyAction } from "redux";
import { createReducer, updateItemInArray, updateObject } from "../utils";
import { SET_GROUPS, SET_BLOCKS, SET_TEAMS, SET_MEMBERS, SET_LABELS, ADD_TASK_ASSIGNEE, REMOVE_TASK_ASSIGNEE, ADD_TASK_LABEL, REMOVE_TASK_LABEL, UPDATE_BLOCK_POSITIONS, UPDATE_TASK_POSITIONS, SET_TASKS } from "./constants";
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

const updateBlockPositions: ReducerAction = (state, action) => {
    const blocks: {id: number, position: number}[] = action.payload;

    return updateObject(state, {
        blocks: state.blocks.map(block => {
            const b = blocks.find(b => b.id === block.id);
            if(!b) return block;

            return updateObject(block, {
                position: b.position
            })
        })
    })
}

const setTasks: ReducerAction = (state, action) => {
    const tasks: Task[] = action.payload;

    return updateObject(state, {
        tasks
    })
}

const updateTaskPositions: ReducerAction = (state, action) => {
    const tasks: {id: number, position: number}[] = action.payload.tasks;

    return updateObject(state, {
        tasks: state.tasks.map(task => {
            const t = tasks.find(t => t.id === task.id);
            if(!t) return task;

            return updateObject(task, {
                position: t.position
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
    const taskId: number = action.payload.taskId;
    const label: Label = action.payload.label;

    return updateObject(state, {
        tasks: updateItemInArray(
            state.tasks, 
            taskId, 
            task => updateObject(task, {
                labels: [...task.labels, ...[label]]
            }
        ))
    })
}

const removeTaskLabel: ReducerAction = (state, action) => {
    const taskId: number = action.payload.taskId;
    const labelId: number = action.payload.labelId;

    return updateObject(state, {
        tasks: updateItemInArray(
            state.tasks, 
            taskId, 
            task => updateObject(task, {
                labels: task.labels.filter(label => label.id !== labelId)
            }
        ))
    })
}

const addTaskAssignee: ReducerAction = (state, action) => {
    const taskId: number = action.payload.taskId;
    const member: Member = action.payload.member;

    return updateObject(state, {
        tasks: updateItemInArray(
            state.tasks, 
            taskId, 
            task => updateObject(task, {
                assignees: [...task.assignees, ...[member]]
            }
        ))
    })
}

const removeTaskAssignee: ReducerAction = (state, action) => {
    const taskId: number = action.payload.taskId;
    const memberId: number = action.payload.memberId;

    return updateObject(state, {
        tasks: updateItemInArray(
            state.tasks, 
            taskId, 
            task => updateObject(task, {
                assignees: task.assignees.filter(assignee => assignee.id !== memberId)
            }
        ))
    })
}

// Creating reducer
export const teamsReducer = createReducer({
    teams: [],
    groups: [],
    blocks: [],
    tasks: [],
    members: [],
    labels: [],
    loading: true
}, {
    [SET_TEAMS]: setTeams,
    [SET_MEMBERS]: setMembers,
    [SET_LABELS]: setLabels,
    [SET_GROUPS]: setGroups,
    [SET_TASKS]: setTasks,
    [UPDATE_BLOCK_POSITIONS]: updateBlockPositions,
    [UPDATE_TASK_POSITIONS]: updateTaskPositions,
    [SET_BLOCKS]: setBlocks,
    [ADD_TASK_ASSIGNEE]: addTaskAssignee,
    [REMOVE_TASK_ASSIGNEE]: removeTaskAssignee,
    [ADD_TASK_LABEL]: addTaskLabel,
    [REMOVE_TASK_LABEL]: removeTaskLabel
})