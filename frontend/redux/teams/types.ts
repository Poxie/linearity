import { Group, Team } from "@/types";

export interface TeamsState {
    teams: Team[];
    groups: {[groupId: string]: Group[] | undefined}
    loading: boolean;
}