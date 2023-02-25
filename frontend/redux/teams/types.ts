import { Block, Group, Team } from "@/types";

export interface TeamsState {
    teams: Team[];
    groups: {[groupId: string]: Group[] | undefined};
    blocks: {[blockId: number]: Block[] | undefined};
    loading: boolean;
}