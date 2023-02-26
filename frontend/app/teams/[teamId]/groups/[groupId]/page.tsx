"use client";

import { Group } from "@/components/group";
import { useAuth } from "@/contexts/auth";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setBlocks } from "@/redux/teams/actions";
import { selectGroupHasFetchedBlocks } from "@/redux/teams/selectors";
import { Block } from "@/types";
import { useEffect } from "react"

export default function GroupPage({ params: { groupId, teamId } }: {
    params: { groupId: string, teamId: string }
}) {
    const { get, token } = useAuth();

    const dispatch = useAppDispatch();
    const blocksFetched = useAppSelector(state => selectGroupHasFetchedBlocks(state, parseInt(groupId)));

    useEffect(() => {
        if(!token || blocksFetched) return;

        get<Block[]>(`/groups/${groupId}/blocks`)
            .then(blocks => {
                dispatch(setBlocks(blocks));
            })
    }, [get, token, groupId, blocksFetched]);

    return <Group teamId={parseInt(teamId)} groupId={parseInt(groupId)} />
}