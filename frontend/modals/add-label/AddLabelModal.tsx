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

export const AddLabelModal: React.FC<{
    teamId: number;
}> = ({ teamId }) => {
    const { close } = useModal();
    const { addLabel } = useTeam(teamId);

    const [color, setColor] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const onConfirm = () => {
        if(!name) return;

        setLoading(true);
        addLabel({ name, color })
            .then(close)
            .catch(error => {
                console.log(error);
                setLoading(false);
            })
    }

    return(
        <>
        <ModalHeader>
            Create Team Label
        </ModalHeader>
        <ModalMain className={styles['container']}>
            <ModalGroup header={'Label information'} icon={<InfoIcon />}>
                <Input 
                    placeholder={'Label name'}
                    onChange={setName}
                />
                <AddLabelColorSelector
                    onClick={setColor}    
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
            confirmLabel={'Create label'}
            confirmLoadingLabel={'Creating label...'}
            confirmLoading={loading}
            onCancel={close}
            onConfirm={onConfirm}
        />
        </>
    )
}