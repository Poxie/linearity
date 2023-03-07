import { useAuth } from "@/contexts/auth";
import { useAppDispatch } from "@/redux/store";
import { updateUser } from "@/redux/user/actions";
import { User } from "@/types";
import { useCallback } from "react";

export const useUser = (userId: number) => {
    const { patch } = useAuth();
    const dispatch = useAppDispatch();
    
    const updateProperty = useCallback(async (property: keyof User, value: any, prevValue: any) => {
        dispatch(updateUser(property, value));
        patch(`/users/${userId}`, {
            [property]: value
        }).catch(error => {
            dispatch(updateUser(property, prevValue));
        })
    }, [userId, patch]);

    return { updateProperty };
}