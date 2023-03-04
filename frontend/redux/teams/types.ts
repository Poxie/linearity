import { Block, Group, Invite, Label, Member, Task, Team } from "@/types";

export interface TeamsState {
    teams: Team[];
    members: Member[];
    groups: Group[];
    blocks: Block[];
    tasks: Task[];
    labels: Label[];
    invites: {
        items: Invite[];
        fetchedTeams: number[];
    };
    loading: boolean;
}