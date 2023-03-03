import styles from './AddMember.module.scss';
import { Dropdown } from "@/components/dropdown";
import { Input } from "@/components/input"
import { ModalHeader } from "../ModalHeader"
import { ModalMain } from "../ModalMain"
import { ModalFooter } from '../ModalFooter';
import { useRef, useState } from 'react';
import Button from '@/components/button';
import { useModal } from '@/contexts/modal';
import { useAuth } from '@/contexts/auth';
import { MailIcon } from '@/assets/icons/MailIcon';
import { InfoIcon } from '@/assets/icons/InfoIcon';

const DROPDOWN_ITEMS = [
    { text: 'Member', id: 0 }
];
const getRoleFromId = (id: number) => {
    const item = DROPDOWN_ITEMS.find(item => item.id === id);
    return item?.text.toLowerCase();
}
export const AddMemberModal: React.FC<{
    teamId: number;
}> = ({ teamId }) => {
    const { put } = useAuth();
    const { close } = useModal();

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const usernameRef = useRef<HTMLInputElement>(null);
    const roleRef = useRef(DROPDOWN_ITEMS[0].id);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if(!usernameRef.current) return;

        setLoading(true);
        put(`/users/${usernameRef.current.value}/invitations`, {
            role: getRoleFromId(roleRef.current),
            team_id: teamId
        }).then(() => {
            setSuccess(true);
            setError(null);
        }).catch(error => {
            setSuccess(false);
            setError(error.code === 500 ? 'Internal error' : error.message);
        }).finally(() => {
            setLoading(false);
        })
    }

    return(
        <>
        <ModalHeader>
            Add member
        </ModalHeader>
        <ModalMain className={styles['container']}>
            <form onSubmit={onSubmit} className={styles['container']}>
                <div className={styles['header']}>
                    <Input 
                        placeholder={'Member username'}
                        containerClassName={styles['input']}
                        ref={usernameRef}
                    />
                    <Dropdown 
                        items={DROPDOWN_ITEMS}
                        defaultSelected={0}
                        onChange={id => roleRef.current = id}
                        className={styles['dropdown']}
                    />
                </div>
                {success && (
                    <div className={styles['success']}>
                        <MailIcon />
                        <span>
                            {usernameRef.current?.value} has received an invite
                        </span>
                    </div>
                )}
                {error && (
                    <div className={styles['error']}>
                        <InfoIcon />
                        <span>
                            {error}
                        </span>
                    </div>
                )}
                <div className={styles['buttons']}>
                    <Button 
                        type={'transparent'} 
                        onClick={close}
                        buttonType={'button'}
                    >
                        Close
                    </Button>
                    <Button 
                        buttonType={'submit'}
                        disabled={loading}
                    >
                        {loading ? 'Adding member...' : 'Add member'}
                    </Button>
                </div>
            </form>
        </ModalMain>
        </>
    )
}