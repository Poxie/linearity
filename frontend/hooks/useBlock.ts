import { useAuth } from "@/contexts/auth";
import { useAppDispatch } from "@/redux/store";
import { Block, Task } from "@/types";
import { useCallback } from "react"
import { addTask as addBlockTask, updateBlock } from "@/redux/teams/actions";

export const useBlock = (blockId: number) => {
    const { post, patch } = useAuth();
    const dispatch = useAppDispatch();

    const addTask = useCallback(async (task: {
        title?: string;
        description?: string;
        assignees?: number[];
        labels?: number[];
        due_at?: number | null;
    }) => {
        const createdTask = await post<Task>(`/blocks/${blockId}/tasks`, task)
        dispatch(addBlockTask(createdTask));
    }, [blockId, post]);
    const updateProperty = useCallback(async (property: keyof Block, value: any, prevValue: any) => {
        dispatch(updateBlock(blockId, property, value));
        patch(`/blocks/${blockId}`, {
            [property]: value
        }).catch(() => {
            dispatch(updateBlock(blockId, property, prevValue))
        });
    }, [blockId, patch]);

    return { addTask, updateProperty };
}