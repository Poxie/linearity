import { motion, AnimatePresence } from "framer-motion";
import React, { RefObject, useState } from "react"
import styles from './Menu.module.scss';
import { MenuGroups } from "./MenuGroups";

export type MenuItem = {
    text: string;
    onClick: () => void;
    type: 'default' | 'danger';
}
export type MenuGroup = MenuItem[];
export type MenuArguments = {
    groups: MenuGroup[];
    event: React.MouseEvent;
    element: RefObject<HTMLElement>;
    options?: {
        spaceFromElement?: number;
    }
}
const MenuContext = React.createContext({} as {
    setMenu: (args: MenuArguments) => void;
    close: () => void;
})

export const useMenu = () => React.useContext(MenuContext);

export const MenuProvider: React.FC<{
    children: any;
}> = ({ children }) => {
    const [menu, setMenu] = useState<MenuArguments | null>(null);

    const _setMenu = (args: MenuArguments) => {
        args.event.preventDefault();
        setMenu(args);
    }
    const close = () => setMenu(null);
    
    const value = {
        setMenu: _setMenu,
        close
    }
    return(
        <MenuContext.Provider value={value}>
            {children}

            <AnimatePresence>
                {menu && (
                    <>
                    <motion.div
                        exit={{ opacity: 0 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={styles['backdrop']} 
                        onClick={close} 
                    />
                    <MenuGroups 
                        groups={menu.groups}
                        event={menu.event}
                        element={menu.element}
                    />
                    </>
                )}
            </AnimatePresence>
        </MenuContext.Provider>
    )
}