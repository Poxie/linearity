import { Block, Group, Invite, Label, Member, Task, Team } from "@/types";
import { AnyAction } from "redux";
import { createReducer, updateItemInArray, updateObject } from "../utils";
import { SET_GROUPS, SET_BLOCKS, SET_TEAMS, SET_MEMBERS, SET_LABELS, ADD_TASK_ASSIGNEE, REMOVE_TASK_ASSIGNEE, ADD_TASK_LABEL, REMOVE_TASK_LABEL, UPDATE_BLOCK_POSITIONS, UPDATE_TASK_POSITIONS, SET_TASKS, ADD_TASK, UPDATE_TASK_POSITIONS_AND_BLOCKS, ADD_BLOCK, UPDATE_TASK, UPDATE_BLOCK, UPDATE_TEAM, REMOVE_TEAM_LABEL, ADD_TEAM_LABEL, UPDATE_TEAM_LABEL, REMOVE_TASK, SET_INVITES, UPDATE_INVITE_STATUS, ADD_INVITE, ADD_TEAM, SET_TEAM_DATA_LOADED, ADD_GROUP } from "./constants";
import { TeamsState } from "./types";

// Reducer actions
type ReducerAction = (state: TeamsState, action: AnyAction) => TeamsState;

const setTeams: ReducerAction = (state, action) => {
    const teams: Team[] = action.payload;

    return updateObject(state, {
        teams: [...state.teams.filter(team => team.id !== teams[0]?.id), ...teams],
        loading: false
    })
}

const addTeam: ReducerAction = (state, action) => {
    const team: Team = action.payload;

    return updateObject(state, {
        teams: state.teams.concat(team)
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

const setTeamDataLoaded: ReducerAction = (state, action) => {
    const teamId: number = action.payload;

    return updateObject(state, {
        fetchedTeamData: state.fetchedTeamData.concat(teamId)
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
        groups: [...state.groups.filter(group => group.team_id !== groups[0]?.team_id), ...groups]
    })
}

const addGroup: ReducerAction = (state, action) => {
    const group: Group = action.payload;

    return updateObject(state, {
        groups: state.groups.concat(group)
    })
}

const setBlocks: ReducerAction = (state, action) => {
    const blocks: Block[] = action.payload;

    return updateObject(state, {
        blocks: [...state.blocks.filter(block => block.group_id !== blocks[0]?.group_id), ...blocks]
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
    const taskIds = tasks.map(task => task.id);

    return updateObject(state, {
        tasks: [...state.tasks.filter(task => !taskIds.includes(task.id)), ...tasks]
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
        members: [...state.members.filter(member => member.team_id !== members[0].team_id), ...members]
    })
}

const setLabels: ReducerAction = (state, action) => {
    const labels: Label[] = action.payload;

    return updateObject(state, {
        labels: [...state.labels.filter(label => label.team_id !== labels[0].team_id), ...labels]
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

const setInvites: ReducerAction = (state, action) => {
    const teamId: number = action.payload.teamId;
    const invites: Invite[] = action.payload.invites;

    return updateObject(state, {
        invites: updateObject(state.invites, {
            items: [...state.invites.items.filter(invite => invite.team_id !== teamId), ...invites],
            fetchedTeams: state.invites.fetchedTeams.concat(teamId)
        })
    })
}

const addInvite: ReducerAction = (state, action) => {
    const invite: Invite = action.payload;

    return updateObject(state, {
        invites: updateObject(state.invites, {
            items: [...[invite], ...state.invites.items]
        })
    })
}

const updateInviteStatus: ReducerAction = (state, action) => {
    const { inviteId, status }: {
        inviteId: number;
        status: Invite['status'];
    } = action.payload;

    return updateObject(state, {
        invites: updateObject(state.invites, {
            items: state.invites.items.map(invite => {
                if(invite.id !== inviteId) return invite;
                return updateObject(invite, {
                    status
                })
            })
        })
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
    invites: {
        fetchedTeams: [],
        items: []
    },
    fetchedTeamData: [],
    loading: true
}, {
    [SET_INVITES]: setInvites,
    [ADD_INVITE]: addInvite,
    [UPDATE_INVITE_STATUS]: updateInviteStatus,
    [SET_TEAMS]: setTeams,
    [ADD_TEAM]: addTeam,
    [UPDATE_TEAM]: updateTeam,
    [ADD_TEAM_LABEL]: addTeamLabel,
    [REMOVE_TEAM_LABEL]: removeTeamLabel,
    [UPDATE_TEAM_LABEL]: updateTeamLabel,
    [SET_MEMBERS]: setMembers,
    [SET_LABELS]: setLabels,
    [SET_GROUPS]: setGroups,
    [ADD_GROUP]: addGroup,
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
    [REMOVE_TASK_LABEL]: removeTaskLabel,
    [SET_TEAM_DATA_LOADED]: setTeamDataLoaded
})