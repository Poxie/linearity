import styles from './EditBlock.module.scss';
import { InfoIcon } from "@/assets/icons/InfoIcon";
import { useAppSelector } from "@/redux/store";
import { selectBlockInfo } from "@/redux/teams/selectors";
import { ModalGroup } from "../ModalGroup";
import { ModalMain } from "../ModalMain";
import { useBlock } from '@/hooks/useBlock';
import { EditableText } from '@/components/editable-text';

export const EditBlockModal: React.FC<{
    blockId: number;
}> = ({ blockId }) => {
    const { updateProperty } = useBlock(blockId);
    const { name, description } = useAppSelector(state => selectBlockInfo(state, blockId));

    const updateName = (text: string) => {
        updateProperty('name', text, name);
    }
    const updateDescription = (text: string) => {
        updateProperty('description', text, description);
    }

    return(
        <ModalMain className={styles['container']}>
            <ModalGroup 
                header={'Block information'} 
                icon={<InfoIcon />}
            >
                <div className={styles['header']}>
                    <EditableText 
                        onChange={updateName}
                        placeholder={'Name'}
                        defaultValue={name}
                        size={'large'}
                        requiresValue
                    />
                    <EditableText 
                        placeholder={'Add a better description'}
                        onChange={updateDescription}
                        defaultValue={description}
                        requiresValue
                    />
                </div>
            </ModalGroup>
        </ModalMain>
    )
}