"use client";

import styles from './LabelInfo.module.scss';
import { useAppSelector } from "@/redux/store";
import { selectLabelById } from "@/redux/teams/selectors";
import { ArrowIcon } from '@/assets/icons/ArrowIcon';
import Link from 'next/link';

export const LabelInfoHeader: React.FC<{
    labelId: number;
}> = ({ labelId }) => {
    const label = useAppSelector(state => selectLabelById(state, labelId));
    return(
        <div className={styles['header']}>
            <Link 
                className={styles['back-button']}
                href={`/teams/${label?.team_id}/settings/labels`}
            >
                <ArrowIcon />
                <span>
                    Labels
                </span>
            </Link>
            <div className={styles['label']}>
                <div 
                    className={styles['label-dot']}
                    style={label?.color ? {
                        backgroundColor: label.color,
                        borderColor: label.color
                    } : undefined}
                />
                {label?.name}
            </div>
        </div>
    )
}