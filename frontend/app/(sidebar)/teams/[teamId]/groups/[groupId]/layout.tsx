"use client";

import { GroupSelector } from "@/components/team/GroupSelector";

export default function GroupLayout({
    children,
    params: { teamId }
}: {
    children: React.ReactNode;
    params: { teamId?: string };
}) {
    return(
        <>
            <GroupSelector teamId={parseInt(teamId || '')} /> 
            {children}
        </>
    )
}