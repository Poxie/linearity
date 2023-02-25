import { Block, Group, Task, Team } from "@/types";
import { AnyAction } from "redux";
import { createReducer, updateObject } from "../utils";
import { ADD_BLOCK_TASK, SET_GROUPS, SET_BLOCKS, SET_TEAMS } from "./constants";
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

// Creating reducer
export const teamsReducer = createReducer({
    teams: [],
    groups: [],
    blocks: [],
    loading: true
}, {
    [SET_TEAMS]: setTeams,
    [SET_GROUPS]: setGroups,
    [SET_BLOCKS]: setBlocks,
    [ADD_BLOCK_TASK]: addBlockTask
})