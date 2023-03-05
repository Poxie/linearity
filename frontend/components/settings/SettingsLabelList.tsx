import { useModal } from "@/contexts/modal";
import { AddLabelModal } from "@/modals/add-label/AddLabelModal";
import { useAppSelector } from "@/redux/store";
import { selectTeamLabels } from "@/redux/teams/selectors";
import { useSettings } from "."
import { LabelList } from "../label-list/LabelList";

export const SettingsLabelList = () => {
    const { setModal } = useModal();
    const { teamId } = useSettings();
    const labels = useAppSelector(state => selectTeamLabels(state, teamId));

    const openModal = () => setModal(<AddLabelModal teamId={teamId} />);

    return(
        <LabelList 
            labels={labels}
            hasContextMenu
            contextMenuOnClick
            onAddButtonClicked={openModal}
        />
    )
}