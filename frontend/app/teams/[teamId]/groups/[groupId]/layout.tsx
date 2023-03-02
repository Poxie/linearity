"use client";

import { GroupSelector } from "@/components/team/GroupSelector";
import { PortalProvider } from "@/contexts/portal";

export default function GroupLayout({
    children,
    params: { teamId }
}: {
    children: React.ReactNode;
    params: { teamId?: string };
}) {
    return(
        <PortalProvider>
            <div style={{ flex: 1 }}>
                <GroupSelector teamId={parseInt(teamId || '')} /> 
                {children}
            </div>
        </PortalProvider>
    )
}