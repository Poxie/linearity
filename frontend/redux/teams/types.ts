import { Block, Group, Team } from "@/types";

export interface TeamsState {
    teams: Team[];
    groups: Group[];
    blocks: Block[];
    loading: boolean;
}