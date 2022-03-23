import React, { useEffect } from "react"
import { AppInitialProps, AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"
import theme from "../theme"
import Head from "next/head"


type Props = AppProps<AppInitialProps>

const App: React.FC<Props> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Mame</title>
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default App
