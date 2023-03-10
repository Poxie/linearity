export interface User {
    id: number;
    username: string;
    name: string;
    bio: string | null;
    avatar: string | null;
    email: string | null;
    created_at: number;
}
export interface Member extends User {
    team_id: number;
    joined_at: number;
    task_count: number;
    role: 'owner' | 'member';
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
export interface Invite {
    id: number;
    user_id: number;
    team_id: number;
    sender_id: number;
    role: 'owner' | 'member';
    status: 'pending' | 'rejected' | 'accepted' | 'expired';
    user: User;
    sender: User;
    created_at: number;
    updated_at: number | null;
}
export interface InboxInvite extends Invite {
    team: Team;
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
    due_at: number | null;
}
export interface Label {
    id: number;
    team_id: number;
    name: string;
    color: string | null;
    created_at: number;
    task_count: number;
}