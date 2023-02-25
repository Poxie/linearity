import { Block, Group, Task, Team } from "@/types";
import { AnyAction } from "redux";
import { createReducer, updateObject } from "../utils";
import { ADD_BLOCK_TASK, SET_GROUP_BLOCKS, SET_TEAMS, SET_TEAM_GROUPS } from "./constants";
import { TeamsState } from "./types";

// Reducer actions
type ReducerAction = (state: TeamsState, action: AnyAction) => TeamsState;

const setTeams: ReducerAction = (state, action) => {
    const teams: Team[] = action.payload;

    return updateObject(state, {
        ...state,
        teams,
        loading: false
    })
}

const setTeamGroups: ReducerAction = (state, action) => {
    const groups: Group[] = action.payload.groups;
    const teamId: string = action.payload.teamId;

    return updateObject(state, {
        ...state,
        groups: {
            ...state.groups,
            [teamId]: groups
        }
    })
}

const setGroupBlocks: ReducerAction = (state, action) => {
    const blocks: Block[] = action.payload.blocks;

    return updateObject(state, {
        ...state,
        blocks: [...state.blocks, ...blocks]
    })
}

const addBlockTask: ReducerAction = (state, action) => {
    const { blockId, task } = action.payload as {
        blockId: number;
        task: Task;
    }

    return updateObject(state, {
        ...state,
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
    groups: {},
    blocks: [],
    loading: true
}, {
    [SET_TEAMS]: setTeams,
    [SET_TEAM_GROUPS]: setTeamGroups,
    [SET_GROUP_BLOCKS]: setGroupBlocks,
    [ADD_BLOCK_TASK]: addBlockTask
})