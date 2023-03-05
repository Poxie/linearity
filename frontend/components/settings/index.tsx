"use client";

import React from 'react';
import { InfoIcon } from '@/assets/icons/InfoIcon';
import { LabelIcon } from '@/assets/icons/LabelIcon';
import { useTeam } from '@/hooks/useTeam';
import { ModalGroup } from '@/modals/ModalGroup';
import { useAppSelector } from '@/redux/store';
import { selectTeamById } from '@/redux/teams/selectors';
import styles from './Settings.module.scss';
import { MemberIcon } from '@/assets/icons/MemberIcon';
import { SettingsLabelList } from './SettingsLabelList';
import { SettingsMemberList } from './SettingsMemberList';
import { EditableText } from '../editable-text';

const SettingsContext = React.createContext({} as {
    teamId: number;
})

export const useSettings = () => React.useContext(SettingsContext);

export const Settings = ({ params: { teamId } }: {
    params: { teamId: string }
}) => {
    const team = useAppSelector(state => selectTeamById(state, parseInt(teamId)));
    const { updateProperty } = useTeam(parseInt(teamId));

    if(!team) return null;

    const { name, description } = team;
    
    const updateName = (text: string) => updateProperty('name', text, name)
    const updateDescription = (text: string) => updateProperty('description', text, description);
    return(
        <SettingsContext.Provider value={{ teamId: parseInt(teamId) }}>
            <div className={styles['container']}>
                <ModalGroup header={'Team information'} icon={<InfoIcon />}>
                    <div className={styles['header']}>
                        <EditableText 
                            placeholder={'Name'}
                            defaultValue={name}
                            onChange={updateName}
                            size={'large'}
                        />
                        <EditableText 
                            placeholder={'Add a better description'}
                            defaultValue={description || ''}
                            onChange={updateDescription}
                        />
                    </div>
                </ModalGroup>
                <ModalGroup header={'Team labels'} icon={<LabelIcon />}>
                    <SettingsLabelList />
                </ModalGroup>
                <ModalGroup header={'Members'} icon={<MemberIcon />}>
                    <SettingsMemberList />
                </ModalGroup>
            </div>
        </SettingsContext.Provider>
    )
}