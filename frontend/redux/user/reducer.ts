import { User } from "@/types";
import { AnyAction } from "redux";
import { createReducer, updateObject } from "../utils";
import { SET_TOKEN, SET_USER } from "./constants";
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

// Creating reducer
export const userReducer = createReducer({
    user: null,
    token: null,
    loading: true
}, {
    [SET_TOKEN]: setToken,
    [SET_USER]: setUser
})