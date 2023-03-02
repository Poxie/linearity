import styles from './AddLabel.module.scss';
import { InfoIcon } from "@/assets/icons/InfoIcon"
import { ModalGroup } from "../ModalGroup"
import { ModalMain } from "../ModalMain"
import { Input } from '@/components/input';
import { ModalHeader } from '../ModalHeader';
import { ModalFooter } from '../ModalFooter';
import { useModal } from '@/contexts/modal';
import { useRef, useState } from 'react';
import { AddLabelColorSelector } from './AddLabelColorSelector';
import { LabelIcon } from '@/assets/icons/LabelIcon';
import { useTeam } from '@/hooks/useTeam';
import { Label } from '@/types';

export const AddLabelModal: React.FC<{
    teamId: number;
    label?: Label;
}> = ({ teamId, label }) => {
    const { close } = useModal();
    const { addLabel, updateLabel } = useTeam(teamId);

    const [color, setColor] = useState<string | null>(label?.color || null);
    const [name, setName] = useState(label?.name || null);
    const [loading, setLoading] = useState(false);

    const onConfirm = () => {
        if(!name) return;

        setLoading(true);
        if(label) {
            updateLabel(label.id, { name, color }, label)
                .then(close)
                .catch(error => {
                    console.log(error)
                    setLoading(false);
                })
        } else {
            addLabel({ name, color })
                .then(close)
                .catch(error => {
                    console.log(error);
                    setLoading(false);
                })
        }
    }

    return(
        <>
        <ModalHeader>
            {label ? 'Edit' : 'Create'} Team Label
        </ModalHeader>
        <ModalMain className={styles['container']}>
            <ModalGroup header={'Label information'} icon={<InfoIcon />}>
                <Input 
                    placeholder={'Label name'}
                    onChange={setName}
                    defaultValue={name || ''}
                />
                <AddLabelColorSelector
                    onClick={setColor}
                    defaultActive={color}
                />
            </ModalGroup>
            <ModalGroup header={'Label preview'} icon={<LabelIcon />} className={styles['preview']}>
                <div 
                    className={styles['label']}
                    style={color ? {
                        backgroundColor: color,
                        borderColor: color
                    } : undefined}
                >
                    {name || 'Label name'}
                </div>
            </ModalGroup>
        </ModalMain>
        <ModalFooter 
            cancelLabel={'Cancel'}
            confirmLabel={label ? 'Edit label' : 'Create label'}
            confirmLoadingLabel={label ? 'Editing label...' : 'Creating label...'}
            confirmLoading={loading}
            onCancel={close}
            onConfirm={onConfirm}
        />
        </>
    )
}