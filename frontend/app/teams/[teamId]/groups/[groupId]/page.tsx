"use client";

import { Group } from "@/components/group";
import { useAuth } from "@/contexts/auth";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setTasks, setBlocks } from "@/redux/teams/actions";
import { selectGroupHasFetchedBlocks } from "@/redux/teams/selectors";
import { selectToken } from "@/redux/user/selectors";
import { Block, Task } from "@/types";
import { useEffect } from "react"

export default function GroupPage({ params: { groupId, teamId } }: {
    params: { groupId: string, teamId: string }
}) {
    const { get } = useAuth();
    const dispatch = useAppDispatch();

    const token = useAppSelector(selectToken);
    const blocksFetched = useAppSelector(state => selectGroupHasFetchedBlocks(state, parseInt(groupId)));

    useEffect(() => {
        if(!token || blocksFetched) return;

        get<(Block & { tasks?: Task[] })[]>(`/groups/${groupId}/blocks`)
            .then(blocks => {
                const tasks = blocks.map(block => {
                    const blockTasks = Array.from(block.tasks || []);
                    delete block.tasks;
                    return blockTasks;
                }).reduce((prev, cur) => prev.concat(cur), []);
                
                dispatch(setTasks(tasks));
                dispatch(setBlocks(blocks));
            })
    }, [get, token, groupId, blocksFetched]);

    return <Group teamId={parseInt(teamId)} groupId={parseInt(groupId)} />
}