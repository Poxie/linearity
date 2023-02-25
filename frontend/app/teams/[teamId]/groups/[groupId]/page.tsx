"use client";

import { useAuth } from "@/contexts/auth";
import { useEffect } from "react"
import { Block } from "typescript";

export default function Group({ params: { groupId } }: {
    params: { groupId: number }
}) {
    const { get, token } = useAuth();

    useEffect(() => {
        if(!token) return;

        get<Block[]>(`/groups/${groupId}/blocks`)
            .then(blocks => {
                console.log(blocks);
            })
    }, [get, token, groupId]);

    return(
        <div>
            {groupId}
        </div>
    )
}