"use client";

import styles from './page.module.scss';
import { Sidebar } from "@/components/sidebar";
import { useAuth } from "@/contexts/auth";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setTeams } from "@/redux/teams/actions";
import { Team } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { selectToken, selectUser, selectUserLoading } from '@/redux/user/selectors';

export default function TeamLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { get } = useAuth();
    const { push } = useRouter();
    const dispatch = useAppDispatch();

    const token = useAppSelector(selectToken);
    const profile = useAppSelector(selectUser);
    const loading = useAppSelector(selectUserLoading);

    // Fetching teams on mount
    useEffect(() => {
        if(loading || !profile || !token) return;

        get<Team[]>(`/users/${profile.id}/teams`)
            .then(teams => {
                dispatch(setTeams(teams));
            })
    }, [loading, get, profile, token]);

    // Making sure user is logged in
    if(!token && !loading) {
        push('/login');
        return;
    }
    if(loading) return null;

    return (
        <div className={styles['app-content']}>
            <Sidebar />
            <main className={styles['container']}>
                {children}
            </main>
        </div>
    )
}