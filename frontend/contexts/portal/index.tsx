import { AnimatePresence } from 'framer-motion';
import React, { ReactElement, useState } from 'react';

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
            {children}
            <AnimatePresence>
                {portal}
            </AnimatePresence>
        </PortalContext.Provider>
    )
}