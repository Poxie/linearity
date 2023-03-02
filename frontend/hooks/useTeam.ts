import { useAuth } from "@/contexts/auth"
import { useAppDispatch } from "@/redux/store";
import { addTeamLabel, removeTeamLabel, updateTeam } from "@/redux/teams/actions";
import { Label, Team } from "@/types";
import { useCallback } from "react";

export const useTeam = (teamId: number) => {
    const { patch, destroy, post } = useAuth();
    const dispatch = useAppDispatch();

    const updateProperty = useCallback(async (property: keyof Team, value: any, prevValue: any) => {
        dispatch(updateTeam(teamId, property, value));
        patch(`/teams/${teamId}`, {
            [property]: value
        }).catch(error => {
            dispatch(updateTeam(teamId, property, prevValue));
        })
    }, [teamId, patch]);
    const removeLabel = useCallback(async (label: Label) => {
        dispatch(removeTeamLabel(label.id));
        destroy(`/labels/${label.id}`)
            .catch(() => {
                
            })
    }, [teamId, destroy]);
    const addLabel = useCallback(async ({ name, color }: {
        name: string;
        color?: string | null;
    }) => {
        post<Label>(`/teams/${teamId}/labels`, { name, color })
            .then(label => {
                dispatch(addTeamLabel(label));
            })
    }, [teamId, post]);

    return { updateProperty, removeLabel, addLabel };
}