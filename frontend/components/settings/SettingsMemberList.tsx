import { useModal } from "@/contexts/modal";
import { usePortal } from "@/contexts/portal";
import { AddMemberModal } from "@/modals/add-member/AddMemberModal";
import { MemberPortal } from "@/portals/member/MemberPortal";
import { useAppSelector } from "@/redux/store";
import { selectTeamMembers } from "@/redux/teams/selectors";
import { Member } from "@/types";
import { useSettings } from "."
import { AssigneeList } from '../assignee-list/AssigneeList';

export const SettingsMemberList = () => {
    const { setPortal } = usePortal();
    const { setModal } = useModal();
    const { teamId } = useSettings();
    const members = useAppSelector(state => selectTeamMembers(state, teamId));

    const openModal = () => setModal(<AddMemberModal teamId={teamId} />);
    const viewMember = (member: Member) => setPortal(<MemberPortal teamId={teamId} userId={member.id} />);

    return(
        <AssigneeList 
            members={members}
            onAddButtonClicked={openModal}
            onMemberClick={viewMember}
        />
    )
}