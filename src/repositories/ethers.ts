import { ethers, Signer } from "ethers"


declare global {
  interface Window {
    ethereum: any
  }
}

const ethersProvider = typeof window === "object" ? new ethers.providers.Web3Provider(window.ethereum) : null

export const getEthersProvider = (): ethers.providers.Web3Provider => {
  return ethersProvider!
}

export const getAccount = async (): Promise<string> => {
  const accounts = await window.ethereum.request({method: "eth_requestAccounts"})
  return accounts[0]
}

export const signMessage = (message: string): Promise<string> => {
  return getEthersProvider().getSigner().signMessage(message)
}