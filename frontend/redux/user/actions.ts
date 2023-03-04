import { InboxInvite, User } from "@/types";
import { SET_TOKEN, SET_USER, SET_USER_INVITES, SET_USER_INVITE_STATUS } from "./constants";

export const setToken = (token: string | null) => ({
    type: SET_TOKEN,
    payload: token
})
export const setUser = (user: User | null) => ({
    type: SET_USER,
    payload: user
})
export const setUserInvites = (invites: InboxInvite[]) => ({
    type: SET_USER_INVITES,
    payload: invites
})
export const setUserInviteStatus = (teamId: number, status: InboxInvite['status']) => ({
    type: SET_USER_INVITE_STATUS,
    payload: { teamId, status }
})