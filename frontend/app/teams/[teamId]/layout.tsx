"use client";

import { TeamHeader } from "@/components/team-header";
import { GroupSelector } from "@/components/team/GroupSelector";
import { useAuth } from "@/contexts/auth";
import { PortalProvider } from "@/contexts/portal";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setGroups, setMembers } from "@/redux/teams/actions";
import { selectTeamMembers } from "@/redux/teams/selectors";
import { Group, User } from "@/types";
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

        // Fetching team groups
        get<Group[]>(`/teams/${teamId}/groups`)
            .then(groups => {
                dispatch(setGroups(groups))
            })
        
        // Fetching team members
        get<User[]>(`/teams/${teamId}/members`)
            .then(members => {
                dispatch(setMembers(members));
            })
    }, [teamId, get, token]);

    if(!teamId) return null;

    return(
        <>
            <TeamHeader teamId={parseInt(teamId)} />
            <PortalProvider>
                <div style={{ flex: 1 }}>
                    <GroupSelector teamId={parseInt(teamId)} /> 
                    {children}
                </div>
            </PortalProvider>
        </>
    )
}