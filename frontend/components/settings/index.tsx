"use client";

import { InfoIcon } from '@/assets/icons/InfoIcon';
import { useTeam } from '@/hooks/useTeam';
import { ModalGroup } from '@/modals/ModalGroup';
import { useAppSelector } from '@/redux/store';
import { selectTeamById } from '@/redux/teams/selectors';
import { useRef, useState } from 'react';
import { Input } from '../input';
import styles from './Settings.module.scss';

export const Settings = ({ params: { teamId } }: {
    params: { teamId: string }
}) => {
    const team = useAppSelector(state => selectTeamById(state, parseInt(teamId)));
    const { updateProperty } = useTeam(parseInt(teamId));

    const [nameEdit, setNameEdit] = useState(false);
    const [descriptionEdit, setDescriptionEdit] = useState(false);

    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);

    if(!team) return null;

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
    
    const { name, description } = team;
    return(
        <div className={styles['container']}>
            <ModalGroup header={'Team information'} icon={<InfoIcon />}>
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
        </div>
    )
}