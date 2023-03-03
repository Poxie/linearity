import { useAuth } from "@/contexts/auth"
import { useAppDispatch, useAppSelector } from "@/redux/store"
import { addTaskAssignee, addTaskLabel, removeTask, removeTaskAssignee, removeTaskLabel, updateTask } from "@/redux/teams/actions"
import { Label, Member, Task } from "@/types"
import { useCallback } from "react"

export const useTask = (taskId: number) => {
    const { put, destroy, patch } = useAuth();
    const dispatch = useAppDispatch();

    const removeSelf = useCallback(async () => {
        destroy(`/tasks/${taskId}`)
            .then(() => {
                dispatch(removeTask(taskId));
            })
            .catch(error =>{
                console.log(error);
            })
    }, [taskId, destroy]);
    const addLabel = useCallback(async (label: Label) => {
        dispatch(addTaskLabel(taskId, label))
        put(`/tasks/${taskId}/labels/${label.id}`)
            .catch(() => removeTaskLabel(taskId, label.id));
    }, [taskId, put]);
    const removeLabel = useCallback(async (label: Label) => {
        dispatch(removeTaskLabel(taskId, label.id))
        destroy(`/tasks/${taskId}/labels/${label.id}`)
            .catch(() => addTaskLabel(taskId, label));
    }, [taskId, destroy]);
    const addAssignee = useCallback(async (assignee: Member) => {
        dispatch(addTaskAssignee(taskId, assignee))
        put(`/tasks/${taskId}/assignees/${assignee.id}`)
            .catch(() => removeTaskAssignee(taskId, assignee.id));
    }, [taskId, put]);
    const removeAssignee = useCallback(async (assignee: Member) => {
        dispatch(removeTaskAssignee(taskId, assignee.id))
        destroy(`/tasks/${taskId}/assignees/${assignee.id}`)
            .catch(() => addTaskAssignee(taskId, assignee));
    }, [taskId, destroy]);
    const updateProperty = useCallback(async (property: keyof Task, value: any, prevValue: any) => {
        dispatch(updateTask(taskId, property, value));
        patch(`/tasks/${taskId}`, {
            [property]: value
        }).catch(() => updateTask(taskId, property, prevValue));
    }, [taskId, patch]);

    return { addLabel, removeLabel, addAssignee, removeAssignee, updateProperty, removeSelf };
}