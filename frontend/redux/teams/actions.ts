import { Group, Team } from "@/types";
import { SET_TEAM_GROUPS, SET_TEAMS } from "./constants";

export const setTeams = (teams: Team[]) => ({
    type: SET_TEAMS,
    payload: teams
})
export const setTeamGroups = (teamId: string, groups: Group[]) => ({
    type: SET_TEAM_GROUPS,
    payload: { teamId, groups }
})