"use client";

import AuthProvider from "@/contexts/auth";
import { store } from "@/redux/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";

export function Providers({ children }: { children: ReactNode }) {
    return(
        <Provider store={store}>
            <AuthProvider>
                {children}
            </AuthProvider>
        </Provider>
    )
}