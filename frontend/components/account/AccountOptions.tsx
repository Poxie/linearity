"use client";

import { EditIcon } from '@/assets/icons/EditIcon';
import { useModal } from '@/contexts/modal';
import { HasTooltip } from '@/contexts/tooltip/HasTooltip';
import { EditUsernameModal } from '@/modals/edit-username/EditUsernameModal';
import { useAppSelector } from '@/redux/store';
import { selectUser } from '@/redux/user/selectors';
import styles from './Account.module.scss';

export const AccountOptions = () => {
    const { setModal } = useModal();

    const user = useAppSelector(selectUser);
    if(!user) return null;

    const editUsername = () => setModal(<EditUsernameModal />);

    return(
        <div className={styles['options']}>
            <div className={styles['options-content']}>
                <div className={styles['options-section']}>
                    <span className={styles['section-header']}>
                        Username
                    </span>
                    <div className={styles['section-value']}>
                        <span>
                            {user.username}
                        </span>
                        <HasTooltip tooltip={'Edit username'}>
                            <button 
                                aria-label={'Edit username'}
                                onClick={editUsername}
                            >
                                <EditIcon />
                            </button>
                        </HasTooltip>
                    </div>
                </div>
                <div className={styles['options-section']}>
                    <span className={styles['section-header']}>
                        Email
                    </span>
                    <div className={styles['section-value']}>
                        <span>
                            {user.email || 'No email set'}
                        </span>
                        <HasTooltip tooltip={'Edit email'}>
                            <button aria-label={'Edit email'}>
                                <EditIcon />
                            </button>
                        </HasTooltip>
                    </div>
                </div>
            </div>
        </div>
    )
}