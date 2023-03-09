"use client";

import { useAuth } from '@/contexts/auth';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setTasks } from '@/redux/teams/actions';
import { selectTasksByLabel } from '@/redux/teams/selectors';
import { Task } from '@/types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './LabelInfo.module.scss';
import { LabelInfoHeader } from './LabelInfoHeader';
import { LabelInfoTasks } from './LabelInfoTasks';

export const LabelInfo = () => {
    const { get } = useAuth();
    const dispatch = useAppDispatch();

    const { teamId, labelId } = useRouter().query as { teamId: string, labelId: string };
    const taskIds = useAppSelector(state => selectTasksByLabel(state, parseInt(teamId), parseInt(labelId)));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(taskIds.length) return setLoading(false);

        get<Task[]>(`/labels/${labelId}/tasks`)
            .then(tasks => {
                dispatch(setTasks(tasks));
                setLoading(false);
            })
    }, [labelId, taskIds.length]);

    return(
        <div className={styles['container']}>
            <LabelInfoHeader labelId={parseInt(labelId)} />
            <LabelInfoTasks taskIds={taskIds} loading={loading} />
        </div>
    )
}