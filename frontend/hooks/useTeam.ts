import { useAuth } from "@/contexts/auth"
import { useAppDispatch } from "@/redux/store";
import { updateTeam } from "@/redux/teams/actions";
import { Team } from "@/types";
import { useCallback } from "react";

export const useTeam = (teamId: number) => {
    const { patch } = useAuth();
    const dispatch = useAppDispatch();

    const updateProperty = useCallback(async (property: keyof Team, value: any, prevValue: any) => {
        dispatch(updateTeam(teamId, property, value));
        patch(`/teams/${teamId}`, {
            [property]: value
        }).catch(error => {
            dispatch(updateTeam(teamId, property, prevValue));
        })
    }, [teamId, patch]);

    return { updateProperty };
}