import { useModal } from "@/contexts/modal";
import { AddMemberModal } from "@/modals/add-member/AddMemberModal";
import { useAppSelector } from "@/redux/store";
import { selectTeamMembers } from "@/redux/teams/selectors";
import { useSettings } from "."
import { AssigneeList } from '../assignee-list/AssigneeList';

export const SettingsMemberList = () => {
    const { setModal } = useModal();
    const { teamId } = useSettings();
    const members = useAppSelector(state => selectTeamMembers(state, teamId));

    const openModal = () => setModal(<AddMemberModal teamId={teamId} />);

    return(
        <AssigneeList 
            members={members}
            onAddButtonClicked={openModal}
        />
    )
}