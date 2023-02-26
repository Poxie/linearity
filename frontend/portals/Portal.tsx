import styles from './Portal.module.scss';
import { motion } from 'framer-motion';
import { PortalHeader } from './PortalHeader';

const INITIAL_RIGHT = -400;
const DISTNACE_FROM_SPACE = 20;
export const Portal: React.FC<{
    header: string;
    subHeader?: string;
    children: any;
}> = ({ header, subHeader, children }) => {
    return(
        <motion.div 
            className={styles['container']}
            initial={{ right: INITIAL_RIGHT }}
            exit={{ right: INITIAL_RIGHT }}
            animate={{ right: DISTNACE_FROM_SPACE }}
        >
            <PortalHeader 
                header={header} 
                subHeader={subHeader} 
            />
            {children}
        </motion.div>
    )
}