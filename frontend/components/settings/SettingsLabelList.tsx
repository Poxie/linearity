import styles from './Settings.module.scss';
import { AddIcon } from "@/assets/icons/AddIcon";
import { useAppSelector } from "@/redux/store";
import { selectTeamLabels } from "@/redux/teams/selectors";
import { useSettings } from "."
import { LabelList } from "../label-list/LabelList";
import { useModal } from '@/contexts/modal';
import { AddLabelModal } from '@/modals/add-label/AddLabelModal';

export const SettingsLabelList = () => {
    const { teamId } = useSettings();
    const { setModal } = useModal();
    const labels = useAppSelector(state => selectTeamLabels(state, teamId));

    const openModal = () => {
        setModal(<AddLabelModal teamId={teamId} />);
    }

    return(
        <div className={styles['labels']}>
            {labels.length !== 0 && (
                <LabelList 
                    labels={labels}
                    hasContextMenu
                />
            )}
            <button 
                className={styles['add-label-button']}
                onClick={openModal}
            >
                <AddIcon />
            </button>
        </div>
    )
}