import { InboxInvite, User } from "@/types";
import { AnyAction } from "redux";
import { createReducer, updateObject } from "../utils";
import { SET_TOKEN, SET_USER, SET_USER_INVITES, SET_USER_INVITE_STATUS, UPDATE_USER } from "./constants";
import { UserState } from "./types";

// Reducer actions
type ReducerAction = (state: UserState, action: AnyAction) => UserState;

const setToken: ReducerAction = (state, action) => {
    const token: string | null = action.payload;

    return updateObject(state, {
        token
    })
}

const setUser: ReducerAction = (state, action) => {
    const user: User | null = action.payload;

    return updateObject(state, {
        user,
        loading: false
    })
}

const updateUser: ReducerAction = (state, action) => {
    const property: keyof User = action.payload.property;
    const value: any = action.payload.value;

    return updateObject(state, {
        user: updateObject(state.user, {
            [property]: value
        })
    })
}

const setUserInvites: ReducerAction = (state, action) => {
    const invites: InboxInvite[] = action.payload;

    return updateObject(state, {
        invites
    })
}

const setUserInviteStatus: ReducerAction = (state, action) => {
    const inviteId: number = action.payload.inviteId;
    const status: InboxInvite['status'] = action.payload.status;

    return updateObject(state, {
        invites: state.invites.map(invite => {
            if(invite.id !== inviteId) return invite;
            return updateObject(invite, {
                status
            })
        })
    })
}

// Creating reducer
export const userReducer = createReducer({
    user: null,
    token: null,
    invites: [],
    loading: true
}, {
    [SET_TOKEN]: setToken,
    [SET_USER]: setUser,
    [UPDATE_USER]: updateUser,
    [SET_USER_INVITES]: setUserInvites,
    [SET_USER_INVITE_STATUS]: setUserInviteStatus
})