import { Block, Group, Invite, Label, Member, Task, Team, User } from "@/types";
import { SET_GROUPS, SET_TEAMS, SET_BLOCKS, SET_MEMBERS, SET_LABELS, ADD_TASK_ASSIGNEE, REMOVE_TASK_ASSIGNEE, ADD_TASK_LABEL, REMOVE_TASK_LABEL, UPDATE_BLOCK_POSITIONS, UPDATE_TASK_POSITIONS, SET_TASKS, ADD_TASK, UPDATE_TASK_POSITIONS_AND_BLOCKS, ADD_BLOCK, UPDATE_TASK, UPDATE_BLOCK, UPDATE_TEAM, REMOVE_TEAM_LABEL, ADD_TEAM_LABEL, UPDATE_TEAM_LABEL, REMOVE_TASK, SET_INVITES } from "./constants";

export const setTeams = (teams: Team[]) => ({
    type: SET_TEAMS,
    payload: teams
})
export const updateTeam = (teamId: number, property: keyof Team, value: any) => ({
    type: UPDATE_TEAM,
    payload: { teamId, property, value }
})
export const addTeamLabel = (label: Label) => ({
    type: ADD_TEAM_LABEL,
    payload: label
})
export const removeTeamLabel = (labelId: number) => ({
    type: REMOVE_TEAM_LABEL,
    payload: labelId
})
export const updateTeamLabel = (labelId: number, properties: {[key: string]: any}) => ({
    type: UPDATE_TEAM_LABEL,
    payload: { labelId, properties }
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
export const addBlock = (block: Block) => ({
    type: ADD_BLOCK,
    payload: block
})
export const updateBlock = (blockId: number, property: keyof Block, value: any) => ({
    type: UPDATE_BLOCK,
    payload: { blockId, property, value }
})
export const setTasks = (tasks: Task[]) => ({
    type: SET_TASKS,
    payload: tasks
})
export const addTask = (task: Task) => ({
    type: ADD_TASK,
    payload: task
})
export const removeTask = (taskId: number) => ({
    type: REMOVE_TASK,
    payload: taskId
})
export const updateTask = (taskId: number, property: keyof Task, value: any) => ({
    type: UPDATE_TASK,
    payload: { taskId, property, value }
})
export const updateBlockPositions = (blocks: {id: number, position: number}[]) => ({
    type: UPDATE_BLOCK_POSITIONS,
    payload: blocks
})
export const updateTaskPositions = (blockId: number, tasks: {id: number, position: number}[]) => ({
    type: UPDATE_TASK_POSITIONS,
    payload: { blockId, tasks }
})
export const updateTaskPositionsAndBlocks = (taskId: number, newBlockId: number, newPosition: number) => ({
    type: UPDATE_TASK_POSITIONS_AND_BLOCKS,
    payload: { taskId, newBlockId, newPosition }
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
export const setInvites = (teamId: number, invites: Invite[]) => ({
    type: SET_INVITES,
    payload: { teamId, invites }
})