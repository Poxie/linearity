import { Block, Group, Label, Member, Team } from "@/types";

export interface TeamsState {
    teams: Team[];
    members: Member[];
    groups: Group[];
    blocks: Block[];
    labels: Label[];
    loading: boolean;
}