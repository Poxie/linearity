import React, { ReactElement, RefObject, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Popout } from '@/popouts/Popout';

type PopoutContextType = {
    setPopout: (popout: PopoutArgs) => void;
    close: () => void;
}
type PopoutArgs = {
    popout: ReactElement | null;
    ref: RefObject<HTMLElement> | null;
}

const PopoutContext = React.createContext({} as PopoutContextType);

export const usePopout = () => React.useContext(PopoutContext);

export const PopoutProvider: React.FC<{
    children: any;
}> = ({ children }) => {
    const [popout, setPopout] = useState<PopoutArgs>({
        popout: null,
        ref: null
    });

    const close = () => setPopout({ popout: null, ref: null });

    const value = {
        setPopout,
        close
    }
    return(
        <PopoutContext.Provider value={value}>
            {children}
            <AnimatePresence>
                {popout.popout && popout.ref && (
                    <Popout element={popout.ref}>
                        {popout.popout}
                    </Popout>
                )}
            </AnimatePresence>
        </PopoutContext.Provider>
    )
}