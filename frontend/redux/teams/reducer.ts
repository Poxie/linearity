import { Block, Group, Label, Member, Task, Team } from "@/types";
import { AnyAction } from "redux";
import { createReducer, updateItemInArray, updateObject } from "../utils";
import { SET_GROUPS, SET_BLOCKS, SET_TEAMS, SET_MEMBERS, SET_LABELS, ADD_TASK_ASSIGNEE, REMOVE_TASK_ASSIGNEE, ADD_TASK_LABEL, REMOVE_TASK_LABEL, UPDATE_BLOCK_POSITIONS, UPDATE_TASK_POSITIONS, SET_TASKS, ADD_TASK, UPDATE_TASK_POSITIONS_AND_BLOCKS, ADD_BLOCK, UPDATE_TASK, UPDATE_BLOCK, UPDATE_TEAM, REMOVE_TEAM_LABEL, ADD_TEAM_LABEL, UPDATE_TEAM_LABEL, REMOVE_TASK } from "./constants";
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

const updateTeam: ReducerAction = (state, action) => {
    const { teamId, property, value }: {
        teamId: number;
        property: keyof Team;
        value: any;
    } = action.payload;

    return updateObject(state, {
        teams: updateItemInArray(state.teams, teamId, team => updateObject(team, {
            [property]: value
        }))
    })
}

const addTeamLabel: ReducerAction = (state, action) => {
    const label: Label = action.payload;

    return updateObject(state, {
        labels: [...state.labels, ...[label]]
    })
}

const removeTeamLabel: ReducerAction = (state, action) => {
    const labelId: number = action.payload;

    return updateObject(state, {
        labels: state.labels.filter(label => label.id !== labelId),
        tasks: state.tasks.map(task => updateObject(task, {
            labels: task.labels.filter(label => label.id !== labelId)
        }))
    })
}

const updateTeamLabel: ReducerAction = (state, action) => {
    const labelId: number = action.payload.labelId;
    const properties: {[key: string]: any} = action.payload.properties;

    return updateObject(state, {
        labels: updateItemInArray(state.labels, labelId, label => updateObject(label, properties)),
        tasks: state.tasks.map(task => updateObject(task, {
            labels: task.labels.map(label => {
                if(label.id !== labelId) return label;

                return updateObject(label, {
                    ...properties
                })
            })
        }))
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

const addBlock: ReducerAction = (state, action) => {
    const block: Block = action.payload;

    return updateObject(state, {
        blocks: [...state.blocks, ...[block]]
    })
}

const updateBlock: ReducerAction = (state, action) => {
    const blockId: number = action.payload.blockId;
    const property: keyof Block = action.payload.property;
    const value: any = action.payload.value;

    return updateObject(state, {
        blocks: updateItemInArray(state.blocks, blockId, block => updateObject(block, {
            [property]: value
        }))
    })
}

const updateBlockPositions: ReducerAction = (state, action) => {
    const blocks: {id: number, position: number}[] = action.payload;

    return updateObject(state, {
        blocks: state.blocks.map(block => {
            const b = blocks.find(b => b.id === block.id);
            if(!b) return block;

            return updateObject(block, {
                position: b.position
            })
        })
    })
}

const setTasks: ReducerAction = (state, action) => {
    const tasks: Task[] = action.payload;

    return updateObject(state, {
        tasks
    })
}

const addTask: ReducerAction = (state, action) => {
    const task: Task = action.payload;

    return updateObject(state, {
        tasks: [...state.tasks, ...[task]]
    })
}

const removeTask: ReducerAction = (state, action) => {
    const taskId: number = action.payload;
    
    return updateObject(state, {
        tasks: state.tasks.filter(task => task.id !== taskId)
    })
}

const updateTask: ReducerAction = (state, action) => {
    const taskId: number = action.payload.taskId;
    const property: keyof Task = action.payload.property;
    const value: any = action.payload.value;

    return updateObject(state, {
        tasks: updateItemInArray(state.tasks, taskId, task => updateObject(task, {
            [property]: value
        }))
    })
}

const updateTaskPositions: ReducerAction = (state, action) => {
    const tasks: {id: number, position: number}[] = action.payload.tasks;

    return updateObject(state, {
        tasks: state.tasks.map(task => {
            const t = tasks.find(t => t.id === task.id);
            if(!t) return task;

            return updateObject(task, {
                position: t.position
            })
        })
    })
}

const updateTaskPositionsAndBlocks: ReducerAction = (state, action) => {
    const taskId: number = action.payload.taskId;
    const newBlockId: number = action.payload.newBlockId;
    const newPosition: number = action.payload.newPosition;

    const prevTask = state.tasks.find(task => task.id === taskId);
    if(!prevTask) return state;

    return updateObject(state, {
        tasks: state.tasks.map(task => {
            if(task.id === taskId) {
                return updateObject(task, {
                    block_id: newBlockId,
                    position: newPosition
                })
            }

            if(task.block_id === prevTask.block_id) {
                if(task.position >= prevTask.position) {
                    return updateObject(task, {
                        position: task.position - 1
                    })
                }
            }

            if(task.block_id === newBlockId) {
                if(task.position >= newPosition) {
                    return updateObject(task, {
                        position: task.position + 1
                    })
                }
            }

            return task;
        })
    })
}

const setMembers: ReducerAction = (state, action) => {
    const members: Member[] = action.payload;

    return updateObject(state, {
        members
    })
}

const setLabels: ReducerAction = (state, action) => {
    const labels: Label[] = action.payload;

    return updateObject(state, {
        labels
    })
}

const addTaskLabel: ReducerAction = (state, action) => {
    const taskId: number = action.payload.taskId;
    const label: Label = action.payload.label;

    return updateObject(state, {
        tasks: updateItemInArray(
            state.tasks, 
            taskId, 
            task => updateObject(task, {
                labels: [...task.labels, ...[label]]
            }
        )),
        labels: updateItemInArray(state.labels, label.id, label => updateObject(label, {
            task_count: label.task_count + 1
        }))
    })
}

const removeTaskLabel: ReducerAction = (state, action) => {
    const taskId: number = action.payload.taskId;
    const labelId: number = action.payload.labelId;

    return updateObject(state, {
        tasks: updateItemInArray(
            state.tasks, 
            taskId, 
            task => updateObject(task, {
                labels: task.labels.filter(label => label.id !== labelId)
            }
        )),
        labels: updateItemInArray(state.labels, labelId, label => updateObject(label, {
            task_count: label.task_count - 1
        }))
    })
}

const addTaskAssignee: ReducerAction = (state, action) => {
    const taskId: number = action.payload.taskId;
    const member: Member = action.payload.member;

    return updateObject(state, {
        tasks: updateItemInArray(
            state.tasks, 
            taskId, 
            task => updateObject(task, {
                assignees: [...task.assignees, ...[member]]
            }
        ))
    })
}

const removeTaskAssignee: ReducerAction = (state, action) => {
    const taskId: number = action.payload.taskId;
    const memberId: number = action.payload.memberId;

    return updateObject(state, {
        tasks: updateItemInArray(
            state.tasks, 
            taskId, 
            task => updateObject(task, {
                assignees: task.assignees.filter(assignee => assignee.id !== memberId)
            }
        ))
    })
}

// Creating reducer
export const teamsReducer = createReducer({
    teams: [],
    groups: [],
    blocks: [],
    tasks: [],
    members: [],
    labels: [],
    loading: true
}, {
    [SET_TEAMS]: setTeams,
    [UPDATE_TEAM]: updateTeam,
    [ADD_TEAM_LABEL]: addTeamLabel,
    [REMOVE_TEAM_LABEL]: removeTeamLabel,
    [UPDATE_TEAM_LABEL]: updateTeamLabel,
    [SET_MEMBERS]: setMembers,
    [SET_LABELS]: setLabels,
    [SET_GROUPS]: setGroups,
    [SET_TASKS]: setTasks,
    [ADD_TASK]: addTask,
    [REMOVE_TASK]: removeTask,
    [UPDATE_TASK]: updateTask,
    [UPDATE_BLOCK_POSITIONS]: updateBlockPositions,
    [UPDATE_TASK_POSITIONS]: updateTaskPositions,
    [UPDATE_TASK_POSITIONS_AND_BLOCKS]: updateTaskPositionsAndBlocks,
    [SET_BLOCKS]: setBlocks,
    [ADD_BLOCK]: addBlock,
    [UPDATE_BLOCK]: updateBlock,
    [ADD_TASK_ASSIGNEE]: addTaskAssignee,
    [REMOVE_TASK_ASSIGNEE]: removeTaskAssignee,
    [ADD_TASK_LABEL]: addTaskLabel,
    [REMOVE_TASK_LABEL]: removeTaskLabel
})