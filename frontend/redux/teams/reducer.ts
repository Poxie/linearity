import { Team } from "@/types";
import { AnyAction } from "redux";
import { createReducer, updateObject } from "../utils";
import { SET_TEAMS } from "./constants";
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

// Creating reducer
export const teamsReducer = createReducer({
    teams: [],
    loading: true
}, {
    [SET_TEAMS]: setTeams
})