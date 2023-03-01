export interface User {
    id: number;
    username: string;
    name: string;
    avatar: string | null;
    created_at: number;
}
export interface Member extends User {
    team_id: number;
    joined_at: number;
}
export interface Team {
    created_at: number;
    description: null | string;
    icon: null | string;
    id: number;
    name: string;
    owner_id: number;
    team_id: number;
    member_count: number;
    task_count: number;
    primary_group_id: number;
}
export interface Group {
    id: number;
    team_id: number;
    name: string | null;
    description: string | null;
    created_at: number;
}
export interface Block {
    created_at: number;
    description: string | null;
    group_id: number;
    id: number;
    name: string;
    position: number;
    team_id: number;
}
export interface Task {
    block_id: number;
    created_at: number;
    description: string;
    id: number;
    position: number;
    team_id: number;
    title: string;
    assignees: Member[];
    labels: Label[];
}
export interface Label {
    id: number;
    team_id: number;
    name: string;
    color: string | null;
    created_at: number;
}