import { TypedDataDomain, TypedDataField } from '@ethersproject/abstract-signer';
import { ethers, utils } from 'ethers';
import { omit } from './helpers';

declare global {
    interface Window {
      ethereum: any
    }
  }

export const getSigner = () => {
    const ethersProvider = typeof window === "object" ? new ethers.providers.Web3Provider(window.ethereum) : null
    const provider = new ethers.providers.Web3Provider(window.ethereum);    
    return provider.getSigner();
};

export const getAddressFromSigner = () => {
    const accounts = window.ethereum.request({method: "eth_requestAccounts"})
    return accounts[0]
};

export const signedTypeData = (
  domain: TypedDataDomain,
  types: Record<string, TypedDataField[]>,
  value: Record<string, any>
) => {
  const signer = getSigner();
  // remove the __typedname from the signature!
  return signer._signTypedData(
    omit(domain, '__typename'),
    omit(types, '__typename'),
    omit(value, '__typename')
  );
};

export const splitSignature = (signature: string) => {
  return utils.splitSignature(signature);
};

export const sendTx = (
  transaction: ethers.utils.Deferrable<ethers.providers.TransactionRequest>
) => {
  const signer = getSigner();
  return signer.sendTransaction(transaction);
};

export const signText = (text: string) => {
  return getSigner().signMessage(text);
};