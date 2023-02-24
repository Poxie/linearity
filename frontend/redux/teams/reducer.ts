import { Group, Team } from "@/types";
import { AnyAction } from "redux";
import { createReducer, updateObject } from "../utils";
import { SET_TEAMS, SET_TEAM_GROUPS } from "./constants";
import { TeamsState } from "./types";

// Reducer actions
type ReducerAction = (state: TeamsState, action: AnyAction) => TeamsState;

const setTeams: ReducerAction = (state, action) => {
    const teams: Team[] = action.payload;

    return updateObject(state, {
        ...state,
        teams,
        loading: false
    })
}

const setTeamGroups: ReducerAction = (state, action) => {
    const groups: Group[] = action.payload.groupId;
    const teamId: string = action.payload.teamId;

    return updateObject(state, {
        ...state,
        groups: {
            ...state.groups,
            [teamId]: groups
        }
    })
}

// Creating reducer
export const teamsReducer = createReducer({
    teams: [],
    groups: {},
    loading: true
}, {
    [SET_TEAMS]: setTeams,
    [SET_TEAM_GROUPS]: setTeamGroups
})