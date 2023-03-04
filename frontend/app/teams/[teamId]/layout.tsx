"use client";

import { TeamHeader } from "@/components/team-header";
import { GroupSelector } from "@/components/team/GroupSelector";
import { useAuth } from "@/contexts/auth";
import { PortalProvider } from "@/contexts/portal";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setGroups, setLabels, setMembers, setTeamDataLoaded } from "@/redux/teams/actions";
import { selectTeamDataLoaded, selectTeamMembers } from "@/redux/teams/selectors";
import { selectToken } from "@/redux/user/selectors";
import { Group, Label, Member, User } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TeamLayout({
    children,
    params: { teamId, groupId }
}: {
    children: React.ReactNode;
    params: { teamId: string, groupId: string };
}) {
    const { replace } = useRouter();
    const { get } = useAuth();
    const dispatch = useAppDispatch();

    const token = useAppSelector(selectToken);
    const dataLoaded = useAppSelector(state => selectTeamDataLoaded(state, parseInt(teamId)));

    useEffect(() => {
        if(!token || dataLoaded) return;

        const requests = [
            { req: get<Group[]>(`/teams/${teamId}/groups`), action: setGroups },
            { req: get<User[]>(`/teams/${teamId}/members`), action: setMembers },
            { req: get<Label[]>(`/teams/${teamId}/labels`), action: setLabels }
        ]

        Promise.all(requests.map(r => r.req))
            .then(responses => {
                // Setting group, members, labels
                (responses as [Group[], Member[], Label[]]).forEach((res, key) => (
                    dispatch(requests[key].action(res as any))
                ))

                // Updating team data loaded status
                dispatch(setTeamDataLoaded(parseInt(teamId)));
            })
            .catch(error => {
                if([404, 401].includes(error.code)) replace(`/teams`);
            })
    }, [teamId, get, token, dataLoaded])

    return(
        <>
            <TeamHeader teamId={parseInt(teamId)} />
            {children}
        </>
    )
}