import { Task } from "@/types";
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
export const selectTeamDataLoaded = (state: RootState, teamId: number) => state.teams.fetchedTeamData.includes(teamId);

const selectMembers = (state: RootState) => state.teams.members;
export const selectTeamMembers = createSelector(
    [selectMembers, selectId],
    (members, teamId) => members.filter(member => member.team_id === teamId)
)
export const selectTeamMemberIds = createSelector(
    [selectTeamMembers],
    members => members.map(member => member.id)
)
export const selectMemberById = createSelector(
    [selectMembers, selectId, _selectId],
    (members, teamId, memberId) => members.find(member => member.team_id === teamId && member.id === memberId)
)

const selectLabels = (state: RootState) => state.teams.labels;
export const selectTeamLabels = createSelector(
    [selectLabels, selectId],
    (labels, teamId) => labels.filter(label => label.team_id === teamId)
)
export const selectLabelById = createSelector(
    [selectLabels, selectId],
    (labels, labelId) => labels.find(label => label.id === labelId)
)

const selectBlocks = (state: RootState) => state.teams.blocks;
export const selectPositionedBlocks = createSelector(
    [selectBlocks, selectId],
    (blocks, groupId) => 
        blocks
            .filter(block => block.group_id === groupId)
            .sort((a,b) => a.position - b.position)
            .map(block => ({
                id: block.id,
                position: block.position,
                name: block.name
            }))
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

const selectTasks = (state: RootState) => state.teams.tasks;
export const selectTasksByTeam = createSelector(
    [selectTasks, selectId],
    (tasks, teamId) => tasks.filter(task => task.team_id === teamId)
)
export const selectTasksByBlockId = createSelector(
    [selectTasks, selectId],
    (tasks, blockId) => tasks.filter(task => task.block_id === blockId)
)
export const selectBlockTaskCount = createSelector(
    [selectTasksByBlockId],
    tasks => tasks.length
)
export const selectPositionedTasks = createSelector(
    [selectTasksByBlockId],
    (tasks) => tasks
        .sort((a,b) => a.position - b.position)
        .map(task => ({
            id: task.id,
            block_id: task.block_id,
            position: task.position
        }))
)
export const selectAllPositionedTasks = createSelector(
    [selectTasks],
    tasks => tasks
        .sort((a,b) => a.position - a.position)
        .map(task => ({
            id: task.id,
            block_id: task.block_id,
            position: task.position
        }))
)
export const selectTaskById = createSelector(
    [selectTasks, selectId],
    (tasks, taskId) => tasks.find(task => task.id === taskId)
)
export const selectTaskInfo = createSelector(
    [selectTaskById],
    task => ({
        title: task?.title,
        due_at: task?.due_at,
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
export const selectTasksByLabel = createSelector(
    [selectTasks, selectId, _selectId],
    (tasks, teamId, labelId) => tasks.filter(task => {
        const hasLabel = task.labels.find(label => label.id === labelId);
        return !!hasLabel;
    }).map(item => item.id)
)
export const selectTasksByAssignee = createSelector(
    [selectTasks, selectId, _selectId],
    (tasks, teamId, assigneeId) => 
        tasks.filter(task => (
            task.team_id === teamId && 
            task.assignees.map(a => a.id).includes(assigneeId)
        ))
)

const selectInvites = (state: RootState) => state.teams.invites.items;
export const selectTeamFetchedInvites = (state: RootState, teamId: number) => state.teams.invites.fetchedTeams.find(id => id === teamId);
export const selectTeamInvites = createSelector(
    [selectInvites, selectId],
    (invites, teamId) => 
        invites.filter(invite => invite.team_id === teamId)
)