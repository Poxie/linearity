import { useAuth } from "@/contexts/auth";
import { useAppDispatch } from "@/redux/store";
import { updateUser } from "@/redux/user/actions";
import { User } from "@/types";
import { useCallback } from "react";

export const useUser = (userId: number) => {
    const { patch } = useAuth();
    const dispatch = useAppDispatch();
    
    const updateProperty = useCallback(async ({ property, value, prevValue, onError, onSuccess }: {
        property: keyof User;
        value: any;
        prevValue: any;
        onError: (error: Error) => void;
        onSuccess: () => void;
    }) => {
        dispatch(updateUser(property, value));
        patch(`/users/${userId}`, {
            [property]: value
        }).then(onSuccess).catch(error => {
            dispatch(updateUser(property, prevValue));
            onError(error);
        });
    }, [userId, patch]);

    return { updateProperty };
}