"use client";

import AuthProvider from "@/contexts/auth";
import { ModalProvider } from "@/contexts/modal";
import { store } from "@/redux/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";

export function Providers({ children }: { children: ReactNode }) {
    return(
        <Provider store={store}>
            <AuthProvider>
                <ModalProvider>
                    {children}
                </ModalProvider>
            </AuthProvider>
        </Provider>
    )
}