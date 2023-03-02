import styles from './Settings.module.scss';
import { useAppSelector } from "@/redux/store";
import { selectTeamMemberIds } from "@/redux/teams/selectors";
import { useSettings } from "."
import { SettingsMember } from "./SettingsMember";

export const SettingsMembers = () => {
    const { teamId } = useSettings();
    const memberIds = useAppSelector(state => selectTeamMemberIds(state, teamId));

    return(
        <div className={styles['members']}>
            {memberIds.map(memberId => (
                <SettingsMember 
                    memberId={memberId}
                    teamId={teamId}
                    key={memberId}
                />
            ))}
        </div>
    )
}