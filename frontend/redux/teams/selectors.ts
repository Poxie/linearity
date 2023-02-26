import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectTeams = (state: RootState) => state.teams.teams;
export const selectTeamsLoading = (state: RootState) => state.teams.loading;

const selectId = (_:RootState, id: number) => id;
const _selectId = (_:RootState, __: number, id: number) => id;
const __selectId = (_:RootState, __: number, ___: number, id: number) => id;

const selectGroups = (state: RootState) => state.teams.groups;
export const selectTeamGroups = createSelector(
    [selectGroups, selectId],
    (groups, teamId) => groups.filter(group => group.team_id === teamId)
)

export const selectTeamById = createSelector(
    [selectTeams, selectId],
    (teams, teamId) => teams.find(team => team.id === teamId)
)

const selectMembers = (state: RootState) => state.teams.members;
export const selectTeamMembers = createSelector(
    [selectMembers, selectId],
    (members, teamId) => members.filter(member => member.team_id === teamId)
)

const selectBlocks = (state: RootState) => state.teams.blocks;
export const selectGroupBlockIds = createSelector(
    [selectBlocks, selectId],
    (blocks, groupId) => blocks.filter(block => block.group_id === groupId).map(block => block.id)
)
export const selectBlockById = createSelector(
    [selectBlocks, selectId],
    (blocks, blockId) => blocks.find(block => block.id === blockId)
)
export const selectBlockInfo = createSelector(
    [selectBlockById],
    block => ({
        team_id: block?.team_id,
        name: block?.name,
        description: block?.description,
        created_at: block?.created_at
    })
)
export const selectBlockTaskCount = createSelector(
    [selectBlockById],
    block => block?.tasks.length
)
export const selectBlockTaskIds = createSelector(
    [selectBlockById],
    block => block?.tasks.map(task => task.id)
)
export const selectTaskById = createSelector(
    [selectBlockById, _selectId],
    (block, taskId) => block?.tasks.find(task => task.id === taskId)
)
export const selectTaskInfo = createSelector(
    [selectTaskById],
    task => ({
        title: task?.title,
        description: task?.description,
        team_id: task?.team_id
    })
)
export const selectTaskAssignees = createSelector(
    [selectTaskById],
    task => task?.assignees
)
export const selectTaskLabels = createSelector(
    [selectTaskById],
    task => task?.labels
)

export const selectGroupHasFetchedBlocks = createSelector(
    [selectGroupBlockIds],
    ids => ids.length !== 0
)