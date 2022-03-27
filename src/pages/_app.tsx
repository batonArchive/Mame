import React, { useEffect } from "react"
import { AppInitialProps, AppProps } from "next/app"
import { ChakraProvider, useToast } from "@chakra-ui/react"
import theme from "../theme"
import { login } from "../repositories/login"
import { refresh } from "../repositories/refresh"
import { createProfile } from "../repositories/create-profile"
import { getProfile } from "../repositories/get-profiles"
import { useRouter } from "next/router"


type Props = AppProps<AppInitialProps>

const App: React.FC<Props> = ({ Component, pageProps }) => {
  const router = useRouter()
  const toast = useToast()
  useEffect(() => {
    const provider = (window as any).ethereum
    if (!provider) {
      alert("Metamask is not installed, please install!")
    } else {
      const chainId = provider.request({ method: "eth_chainId" });
      const testChainId = '0x13881'
      if (chainId !== testChainId) {
        try {
          provider.request({method: 'wallet_switchEthereumChain', params: [{ chainId: testChainId}]});
        } catch (switchError) {
          toast({title: "Failed to switch to the network", status: "error", position: "top"})
        }
      }
    }
  }, [router, toast])
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
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default App
