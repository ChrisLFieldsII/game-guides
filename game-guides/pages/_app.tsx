// import string extensions first
import '~/utils/string/string-extensions'

import React from 'react'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { NativeBaseProvider } from 'native-base'

import '~/styles/globals.css'

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <NativeBaseProvider>
        <Component {...pageProps} />
      </NativeBaseProvider>
    </SessionProvider>
  )
}

export default App
