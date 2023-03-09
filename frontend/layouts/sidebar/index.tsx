import styles from './SidebarLayout.module.scss';
import { Sidebar } from "@/components/sidebar";
import { PortalProvider } from "@/contexts/portal";
import { useAuth } from '@/contexts/auth';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { selectToken, selectUser, selectUserLoading } from '@/redux/user/selectors';
import { useEffect } from 'react';
import { Team } from '@/types';
import { setTeams } from '@/redux/teams/actions';

export const SidebarLayout: React.FC<{
    children: any;
}> = ({ children }) => {
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
        return null;
    }
    if(loading) return null;

    return (
        <div className={styles['app-content']}>
            <Sidebar />
            <PortalProvider>
                <main className={styles['container']}>
                    {children}
                </main>
            </PortalProvider>
        </div>
    )
}