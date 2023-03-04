import { User } from "@/types";
import { SET_TOKEN, SET_USER } from "./constants";

export const setToken = (token: string | null) => ({
    type: SET_TOKEN,
    payload: token
})
export const setUser = (user: User | null) => ({
    type: SET_USER,
    payload: user
})