'use client'
import { SessionProvider } from 'next-auth/react'
import { Provider } from 'react-redux'
import store from '../core/redux/store'

import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ session, children }) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <html lang="en">
          <head>
            <link
              href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css"
              rel="stylesheet"
            />
          </head>
          <body className={inter.className}>{children}</body>
        </html>
      </Provider>
    </SessionProvider>
  )
}
