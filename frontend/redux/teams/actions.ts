import { Block, Group, Label, Member, Task, Team, User } from "@/types";
import { SET_GROUPS, SET_TEAMS, SET_BLOCKS, SET_MEMBERS, SET_LABELS, ADD_TASK_ASSIGNEE, REMOVE_TASK_ASSIGNEE, ADD_TASK_LABEL, REMOVE_TASK_LABEL, UPDATE_BLOCK_POSITIONS, UPDATE_TASK_POSITIONS, SET_TASKS } from "./constants";

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
export const setTasks = (tasks: Task[]) => ({
    type: SET_TASKS,
    payload: tasks
})
export const updateBlockPositions = (blocks: {id: number, position: number}[]) => ({
    type: UPDATE_BLOCK_POSITIONS,
    payload: blocks
})
export const updateTaskPositions = (blockId: number, tasks: {id: number, position: number}[]) => ({
    type: UPDATE_TASK_POSITIONS,
    payload: { blockId, tasks }
})
export const addTaskAssignee = (taskId: number, member: Member) => ({
    type: ADD_TASK_ASSIGNEE,
    payload: { taskId, member }
})
export const removeTaskAssignee = (taskId: number, memberId: number) => ({
    type: REMOVE_TASK_ASSIGNEE,
    payload: { taskId, memberId }
})
export const addTaskLabel = (taskId: number, label: Label) => ({
    type: ADD_TASK_LABEL,
    payload: { taskId, label }
})
export const removeTaskLabel = (taskId: number, labelId: number) => ({
    type: REMOVE_TASK_LABEL,
    payload: { taskId, labelId }
})