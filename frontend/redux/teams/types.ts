import { Block, Group, Member, Team } from "@/types";

export interface TeamsState {
    teams: Team[];
    members: Member[];
    groups: Group[];
    blocks: Block[];
    loading: boolean;
}