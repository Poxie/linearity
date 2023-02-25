"use client";

import { Group } from "@/components/group";
import { useAuth } from "@/contexts/auth";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setGroupBlocks } from "@/redux/teams/actions";
import { selectGroupHasFetchedBlocks } from "@/redux/teams/selectors";
import { Block } from "@/types";
import { useEffect } from "react"

export default function GroupPage({ params: { groupId } }: {
    params: { groupId: number }
}) {
    const { get, token } = useAuth();

    const dispatch = useAppDispatch();
    const blocksFetched = useAppSelector(state => selectGroupHasFetchedBlocks(state, groupId));

    useEffect(() => {
        if(!token || blocksFetched) return;

        get<Block[]>(`/groups/${groupId}/blocks`)
            .then(blocks => {
                dispatch(setGroupBlocks(groupId, blocks));
            })
    }, [get, token, groupId, blocksFetched]);

    return <Group groupId={groupId} />
}