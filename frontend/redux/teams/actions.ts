import { Block, Group, Label, Task, Team, User } from "@/types";
import { SET_GROUPS, SET_TEAMS, SET_BLOCKS, ADD_BLOCK_TASK, SET_MEMBERS, SET_LABELS } from "./constants";

export const setTeams = (teams: Team[]) => ({
    type: SET_TEAMS,
    payload: teams
})
export const setMembers = (members: User[]) => ({
    type: SET_MEMBERS,
    payload: members
})
export const setLabels = (labels: Label[]) => ({
    type: SET_LABELS,
    payload: labels
})
export const setGroups = (groups: Group[]) => ({
    type: SET_GROUPS,
    payload: groups
})
export const setBlocks = (blocks: Block[]) => ({
    type: SET_BLOCKS,
    payload: blocks
})
export const addBlockTask = (blockId: number, task: Task) => ({
    type: ADD_BLOCK_TASK,
    payload: { blockId, task }
})