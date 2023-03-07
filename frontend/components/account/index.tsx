import styles from './Account.module.scss';
import { AccountHeader } from './AccountHeader';
import { AccountOptions } from './AccountOptions';

export const Account = () => {
    return(
        <div className={styles['container']}>
            <div className={styles['content']}>
                <AccountHeader />
                <AccountOptions />
            </div>
        </div>
    )
}