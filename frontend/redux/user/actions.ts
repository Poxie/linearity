import { InboxInvite, User } from "@/types";
import { SET_TOKEN, SET_USER, SET_USER_INVITES, SET_USER_INVITE_STATUS, UPDATE_USER, _UPDATE_USER } from "./constants";

export const setToken = (token: string | null) => ({
    type: SET_TOKEN,
    payload: token
})
export const setUser = (user: User | null) => ({
    type: SET_USER,
    payload: user
})
export const updateUser = (property: keyof User, value: any) => ({
    type: UPDATE_USER,
    payload: { property, value }
})
export const _updateUser = (user: Partial<User>) => ({
    type: _UPDATE_USER,
    payload: user
})
export const setUserInvites = (invites: InboxInvite[]) => ({
    type: SET_USER_INVITES,
    payload: invites
})
export const setUserInviteStatus = (inviteId: number, status: InboxInvite['status']) => ({
    type: SET_USER_INVITE_STATUS,
    payload: { inviteId, status }
})