import { Block, Group, Label, Member, Task, Team, User } from "@/types";
import { SET_GROUPS, SET_TEAMS, SET_BLOCKS, ADD_BLOCK_TASK, SET_MEMBERS, SET_LABELS, ADD_TASK_ASSIGNEE, REMOVE_TASK_ASSIGNEE, ADD_TASK_LABEL, REMOVE_TASK_LABEL, UPDATE_BLOCK_POSITIONS, UPDATE_TASK_POSITIONS } from "./constants";

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
export const updateBlockPositions = (blocks: {id: number, position: number}[]) => ({
    type: UPDATE_BLOCK_POSITIONS,
    payload: blocks
})
export const updateTaskPositions = (blockId: number, tasks: {id: number, position: number}[]) => ({
    type: UPDATE_TASK_POSITIONS,
    payload: { blockId, tasks }
})
export const addBlockTask = (blockId: number, task: Task) => ({
    type: ADD_BLOCK_TASK,
    payload: { blockId, task }
})
export const addTaskAssignee = (blockId: number, taskId: number, member: Member) => ({
    type: ADD_TASK_ASSIGNEE,
    payload: { blockId, taskId, member }
})
export const removeTaskAssignee = (blockId: number, taskId: number, memberId: number) => ({
    type: REMOVE_TASK_ASSIGNEE,
    payload: { blockId, taskId, memberId }
})
export const addTaskLabel = (blockId: number, taskId: number, label: Label) => ({
    type: ADD_TASK_LABEL,
    payload: { blockId, taskId, label }
})
export const removeTaskLabel = (blockId: number, taskId: number, labelId: number) => ({
    type: REMOVE_TASK_LABEL,
    payload: { blockId, taskId, labelId }
})