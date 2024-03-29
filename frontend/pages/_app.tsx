import '../styles/globals.scss'
import { NextPage } from "next"
import { AppProps } from "next/app"
import { ReactElement, ReactNode } from "react"
import { Providers } from '@/contexts'
import { Navbar } from '@/components/navbar'
import { Roboto } from '@next/font/google';

const roboto = Roboto({ weight: ['400', '500', '700'] });

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout ?? ((page) => page)
  
    return(
        <div className={roboto.className}>
            <Providers>
                <Navbar />
                {getLayout(
                    <Component {...pageProps} />
                )}
            </Providers>
        </div>
    )
}