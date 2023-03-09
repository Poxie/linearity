import { TeamHeader } from "@/components/team-header";
import { useAuth } from "@/contexts/auth";
import { useAppDispatch } from "@/redux/store";
import { setBlocks, setGroups, setLabels, setMembers, setTasks, setTeamDataLoaded } from "@/redux/teams/actions";
import { Group, Label, Member, Task } from "@/types";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Block } from "typescript";

export const TeamLayout: React.FC<{
    children: any;
}> = ({ children }) => {
    const { replace, query } = useRouter();
    const { get } = useAuth();
    const dispatch = useAppDispatch();

    const teamId = query.teamId as string;

    useEffect(() => {
        const requests = [
            { req: get<Group[]>(`/teams/${teamId}/groups`), action: setGroups },
            { req: get<Block[]>(`/teams/${teamId}/blocks`), action: setBlocks },
            { req: get<Task[]>(`/teams/${teamId}/tasks`), action: setTasks },
            { req: get<Member[]>(`/teams/${teamId}/members`), action: setMembers },
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
    }, [teamId, get])

    return(
        <>
            <TeamHeader teamId={parseInt(teamId)} />
            {children}
        </>
    )
}