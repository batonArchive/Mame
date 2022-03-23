import { ethers, Signer } from "ethers"


declare global {
  interface Window {
    ethereum: any
  }
}

export const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);

export const getAccount = async (): Promise<string> => {
  const accounts = await window.ethereum.request({method: "eth_requestAccounts"})
  return accounts[0]
}

export const signMessage = (message: string): Promise<string> => {
  return ethersProvider.getSigner().signMessage(message)
}