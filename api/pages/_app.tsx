// import string extensions first
import '~/utils/string/string-extensions'

import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

import '~/styles/globals.css'

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default App
