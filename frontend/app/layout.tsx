import { Roboto } from '@next/font/google';
import AuthProvider from '@/contexts/auth'
import './globals.scss'
import { Providers } from './providers';
import { Navbar } from '@/components/navbar';

const roboto = Roboto({ weight: ['400', '500', '700'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className={roboto.className}>
        <Navbar />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
