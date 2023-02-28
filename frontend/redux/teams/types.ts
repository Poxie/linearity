import { Block, Group, Label, Member, Task, Team } from "@/types";

export interface TeamsState {
    teams: Team[];
    members: Member[];
    groups: Group[];
    blocks: Block[];
    tasks: Task[];
    labels: Label[];
    loading: boolean;
}