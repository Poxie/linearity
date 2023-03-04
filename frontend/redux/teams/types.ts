import { Block, Group, Invite, Label, Member, Task, Team } from "@/types";

export interface TeamsState {
    teams: Team[];
    members: Member[];
    groups: Group[];
    blocks: Block[];
    tasks: Task[];
    labels: Label[];
    invites: Invite[];
    loading: boolean;
}