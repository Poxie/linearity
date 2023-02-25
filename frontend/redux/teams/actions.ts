import { Block, Group, Task, Team } from "@/types";
import { SET_TEAM_GROUPS, SET_TEAMS, SET_GROUP_BLOCKS, ADD_BLOCK_TASK } from "./constants";

export const setTeams = (teams: Team[]) => ({
    type: SET_TEAMS,
    payload: teams
})
export const setTeamGroups = (teamId: string, groups: Group[]) => ({
    type: SET_TEAM_GROUPS,
    payload: { teamId, groups }
})
export const setGroupBlocks = (groupId: number, blocks: Block[]) => ({
    type: SET_GROUP_BLOCKS,
    payload: { groupId, blocks }
})
export const addBlockTask = (blockId: number, task: Task) => ({
    type: ADD_BLOCK_TASK,
    payload: { blockId, task }
})