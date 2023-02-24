export interface User {
    id: number;
    username: string;
    name: string;
    avatar: string | null;
    created_at: number;
}
export interface Team {
    created_at: number;
    description: null | string;
    icon: null | string;
    id: number;
    name: string;
    owner_id: number;
    team_id: number;
}
export interface Group {
    id: string;
    team_id: string;
    name: string | null;
    description: string | null;
    created_at: string;
}