"use client";

import { Group } from "@/components/group";
import { useAuth } from "@/contexts/auth";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setGroupBlocks } from "@/redux/teams/actions";
import { selectGroupHasFetchedBlocks } from "@/redux/teams/selectors";
import { Block } from "@/types";
import { useEffect } from "react"

export default function GroupPage({ params: { groupId } }: {
    params: { groupId: string }
}) {
    const { get, token } = useAuth();

    const dispatch = useAppDispatch();
    const blocksFetched = useAppSelector(state => selectGroupHasFetchedBlocks(state, parseInt(groupId)));

    useEffect(() => {
        if(!token || blocksFetched) return;

        get<Block[]>(`/groups/${groupId}/blocks`)
            .then(blocks => {
                dispatch(setGroupBlocks(parseInt(groupId), blocks));
            })
    }, [get, token, groupId, blocksFetched]);

    return <Group groupId={parseInt(groupId)} />
}