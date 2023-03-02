import { useAuth } from "@/contexts/auth";
import { useAppDispatch } from "@/redux/store";
import { Task } from "@/types";
import { useCallback } from "react"
import { addTask as addBlockTask } from "@/redux/teams/actions";

export const useBlock = (blockId: number) => {
    const { post } = useAuth();
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

    return { addTask };
}