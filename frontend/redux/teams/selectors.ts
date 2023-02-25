import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectTeams = (state: RootState) => state.teams.teams;
export const selectTeamsLoading = (state: RootState) => state.teams.loading;

const selectId = (_:RootState, id: number) => id;
const _selectId = (_:RootState, __: number, id: number) => id;
const selectGroups = (state: RootState) => state.teams.groups;
export const selectTeamGroups = createSelector(
    [selectGroups, selectId],
    (groups, teamId) => groups[teamId]
)

export const selectTeamById = createSelector(
    [selectTeams, selectId],
    (teams, teamId) => teams.find(team => team.id === teamId)
)

const selectBlocks = (state: RootState) => state.teams.blocks;
export const selectGroupBlockIds = createSelector(
    [selectBlocks, selectId],
    (blocks, groupId) => blocks[groupId]?.map(block => block.id)
)
export const selectGroupBlockById = createSelector(
    [selectBlocks, selectId, _selectId],
    (blocks, groupId, blockId) => blocks[groupId]?.find(block => block.id === blockId)
)

export const selectGroupHasFetchedBlocks = createSelector(
    [selectGroupBlockIds],
    ids => !!ids
)