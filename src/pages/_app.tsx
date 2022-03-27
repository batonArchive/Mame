import React, { useEffect } from "react"
import { AppInitialProps, AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"
import theme from "../theme"
import Head from "next/head"
import { login } from "../repositories/login"
import { refresh } from "../repositories/refresh"
import { createProfile } from "../repositories/create-profile"
import { getProfile } from "../repositories/get-profiles"


type Props = AppProps<AppInitialProps>

const App: React.FC<Props> = ({ Component, pageProps }) => {
  useEffect(() => {
    (async () => {
      if (localStorage.getItem("auth_token") && localStorage.getItem("refresh_token") && localStorage.getItem("profile_id")) {
        await refresh()
      } else {
        await login()
        await createProfile(new Date().getTime().toString(16))
        await getProfile()
      }
    })()
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title></title>
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default App
