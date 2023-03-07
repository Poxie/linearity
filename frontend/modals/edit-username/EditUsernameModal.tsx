import styles from './EditUsername.module.scss';
import { Input } from "@/components/input"
import { useModal } from "@/contexts/modal"
import { useUser } from "@/hooks/useUser"
import { useAppSelector } from "@/redux/store"
import { selectUser } from "@/redux/user/selectors"
import { useRef, useState } from "react"
import { ModalFooter } from "../ModalFooter"
import { ModalHeader } from "../ModalHeader"
import { ModalMain } from "../ModalMain"
import { InfoIcon } from '@/assets/icons/InfoIcon';

export const EditUsernameModal = () => {
    const { close } = useModal();

    const user = useAppSelector(selectUser);
    const { updateProperty } = useUser(user?.id as number);

    const [error, setError] = useState<null | string>(null);
    const [loading, setLoading] = useState(false);
    const ref = useRef<HTMLInputElement>(null);

    const onConfirm = () => {
        if(!ref.current?.value) return;

        setLoading(true);
        updateProperty({
            property: 'username',
            value: ref.current.value,
            prevValue: user?.username,
            onError: error => {
                setLoading(false);
                setError(error.message)
            },
            onSuccess: close
        });
    }

    return(
        <>
            <ModalHeader>
                Edit username
            </ModalHeader>
            <ModalMain>
                <>
                <Input 
                    placeholder={'New username'}
                    onSubmit={onConfirm}
                    ref={ref}
                />
                {error && (
                    <span className={styles['error']}>
                        <InfoIcon />
                        {error}
                    </span>
                )}
                </>
            </ModalMain>
            <ModalFooter 
                cancelLabel={'Close'}
                onCancel={close}
                confirmLabel={'Update'}
                onConfirm={onConfirm}
                confirmLoading={loading}
                confirmLoadingLabel={'Updating...'}
            />
        </>
    )
}