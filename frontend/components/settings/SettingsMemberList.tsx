import { useAppSelector } from "@/redux/store";
import { selectTeamMembers } from "@/redux/teams/selectors";
import { useSettings } from "."
import { AssigneeList } from '../assignee-list/AssigneeList';

export const SettingsMemberList = () => {
    const { teamId } = useSettings();
    const members = useAppSelector(state => selectTeamMembers(state, teamId));

    return(
        <AssigneeList 
            members={members}
        />
    )
}