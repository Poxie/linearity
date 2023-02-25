"use client";

import { TeamHeader } from "@/components/team-header";
import { GroupSelector } from "@/components/team/GroupSelector";
import { useAuth } from "@/contexts/auth";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setTeamGroups } from "@/redux/teams/actions";
import { Group } from "@/types";
import { useEffect } from "react";

export default function TeamLayout({
    children,
    params: { teamId, groupId }
}: {
    children: React.ReactNode;
    params: { teamId?: string, groupId?: string };
}) {
    const { get, token } = useAuth();

    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log(teamId, token);
        if(!teamId || !token) return;

        get<Group[]>(`/teams/${teamId}/groups`)
            .then(groups => {
                dispatch(setTeamGroups(teamId, groups))
            })
    }, [teamId, get, token]);

    if(!teamId) return null;

    return(
        <main>
            <TeamHeader teamId={parseInt(teamId)} />
            <GroupSelector teamId={parseInt(teamId)} /> 
            {children}
        </main>
    )
}