import { Team } from "@/types";
import { SET_TEAMS } from "./constants";

export const setTeams = (teams: Team[]) => ({
    type: SET_TEAMS,
    payload: teams
})