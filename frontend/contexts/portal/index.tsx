import React, { CSSProperties, ReactElement, useState } from 'react';
import styles from '../../portals/Portal.module.scss';

type PortalContextType = {
    setPortal: (portal: ReactElement) => void;
    close: () => void;
}

const PortalContext = React.createContext({} as PortalContextType)

export const usePortal = () => React.useContext(PortalContext);

export const PortalProvider: React.FC<{
    children: any;
}> = ({ children }) => {
    const [portal, setPortal] = useState<ReactElement | null>(null);

    const close = () => setPortal(null);

    const value = {
        setPortal,
        close
    }
    return(
        <PortalContext.Provider value={value}>
            <div
                className={[
                    styles['portal-container'],
                    portal ? styles['has-portal'] : ''
                ].join(' ')}
                style={{ '--portal-width': portal ? '400px' : '0px' } as CSSProperties}
            >
                {children}
                {portal}
            </div>
        </PortalContext.Provider>
    )
}