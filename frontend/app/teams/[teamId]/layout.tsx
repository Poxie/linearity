"use client";

import { TeamHeader } from "@/components/team-header";
import { useAuth } from "@/contexts/auth";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setTeamGroups } from "@/redux/teams/actions";
import { selectTeamGroups } from "@/redux/teams/selectors";
import { Group } from "@/types";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function TeamLayout({
    children,
    params: { teamId }
}: {
    children: React.ReactNode;
    params: { teamId?: string };
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
            {children}
        </main>
    )
}