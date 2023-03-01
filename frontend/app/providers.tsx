"use client";

import AuthProvider from "@/contexts/auth";
import { MenuProvider } from "@/contexts/menu";
import { ModalProvider } from "@/contexts/modal";
import { PopoutProvider } from "@/contexts/popout";
import { store } from "@/redux/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";

export function Providers({ children }: { children: ReactNode }) {
    return(
        <Provider store={store}>
            <AuthProvider>
                <PopoutProvider>
                    <ModalProvider>
                        <MenuProvider>
                            {children}
                        </MenuProvider>
                    </ModalProvider>
                </PopoutProvider>
            </AuthProvider>
        </Provider>
    )
}