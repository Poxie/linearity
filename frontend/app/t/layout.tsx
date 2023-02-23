"use client";

import styles from './page.module.scss';
import { Sidebar } from "@/components/sidebar";
import { useAuth } from "@/contexts/auth";
import { useAppDispatch } from "@/redux/store";
import { setTeams } from "@/redux/teams/actions";
import { Team } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function TeamLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { profile, get, loading, token } = useAuth();
    const { push } = useRouter();
    const dispatch = useAppDispatch();

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