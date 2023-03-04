import { InboxInvite, User } from "@/types"

export type UserState = {
    user: User | null;
    token: string | null;
    invites: InboxInvite[];
    loading: boolean;
}