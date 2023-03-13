import styles from './TeamSelection.module.scss';
import Button from "../button"
import { AddIcon } from "@/assets/icons/AddIcon"
import { useModal } from '@/contexts/modal';
import { AddTeamModal } from '@/modals/add-team';

export const AddTeamButton = () => {
    const { setModal } = useModal();

    const openModal = () => setModal(<AddTeamModal />);

    return(
        <Button
            icon={<AddIcon />}
            className={styles['footer-button']}
            onClick={openModal}
        >
            Create Team
        </Button>
    )
}