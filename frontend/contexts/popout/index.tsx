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
    position?: 'up' | 'left'
}

const PopoutContext = React.createContext({} as PopoutContextType);

export const usePopout = () => React.useContext(PopoutContext);

const DEFAULT_POSITION = 'up';
export const PopoutProvider: React.FC<{
    children: any;
}> = ({ children }) => {
    const [popout, setPopout] = useState<PopoutArgs & {position: 'up' | 'left'}>({
        popout: null,
        ref: null,
        position: 'up'
    });

    const _setPopout = (args: PopoutArgs) => setPopout({
        ...args,
        position: args.position || DEFAULT_POSITION
    })
    const close = () => setPopout({ popout: null, ref: null, position: DEFAULT_POSITION });

    const value = {
        setPopout: _setPopout, 
        close
    }
    return(
        <PopoutContext.Provider value={value}>
            {children}
            <AnimatePresence>
                {popout.popout && popout.ref && (
                    <Popout element={popout.ref} position={popout.position}>
                        {popout.popout}
                    </Popout>
                )}
            </AnimatePresence>
        </PopoutContext.Provider>
    )
}