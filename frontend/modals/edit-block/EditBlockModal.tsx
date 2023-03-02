import styles from './EditBlock.module.scss';
import { InfoIcon } from "@/assets/icons/InfoIcon";
import { useAppSelector } from "@/redux/store";
import { selectBlockInfo } from "@/redux/teams/selectors";
import { ModalGroup } from "../ModalGroup";
import { ModalMain } from "../ModalMain";
import { useRef, useState } from 'react';
import { Input } from '@/components/input';
import { useBlock } from '@/hooks/useBlock';

export const EditBlockModal: React.FC<{
    blockId: number;
}> = ({ blockId }) => {
    const { updateProperty } = useBlock(blockId);
    const { name, description } = useAppSelector(state => selectBlockInfo(state, blockId));

    const [nameEdit, setNameEdit] = useState(false);
    const [descriptionEdit, setDescriptionEdit] = useState(false);

    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);

    const updateName = () => {
        if(!nameRef.current?.value || name === nameRef.current?.value) return setNameEdit(false);
        updateProperty('name', nameRef.current?.value, name);
        setNameEdit(false);
    }
    const updateDescription = () => {
        if(description === descriptionRef.current?.value) return setDescriptionEdit(false);
        updateProperty('description', descriptionRef.current?.value, description);
        setDescriptionEdit(false);
    }

    return(
        <ModalMain className={styles['container']}>
            <ModalGroup 
                header={'Block information'} 
                icon={<InfoIcon />}
            >
                <div className={styles['header']}>
                    {!nameEdit ? (
                        <h1 onClick={() => setNameEdit(true)}>
                            {name}
                        </h1>
                    ) : (
                        <Input 
                            placeholder={'Name'}
                            defaultValue={name}
                            onBlur={updateName}
                            ref={nameRef}
                            focusOnMount
                        />
                    )}
                    {!descriptionEdit && description ? (
                        <span onClick={() => setDescriptionEdit(true)}>
                            {description}
                        </span>
                    ) : (
                        <Input 
                            placeholder={'Add a better description'}
                            defaultValue={description || ''}
                            onBlur={updateDescription}
                            ref={descriptionRef}
                            focusOnMount
                            textArea
                        />
                    )}
                </div>
            </ModalGroup>
        </ModalMain>
    )
}