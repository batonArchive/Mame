import { TypedDataDomain, TypedDataField } from '@ethersproject/abstract-signer';
import { ethers, utils, Wallet } from 'ethers';
import { MUMBAI_RPC_URL, PK } from './config';
import { omit } from './helpers';

//export const ethersProvider = new ethers.providers.JsonRpcProvider(MUMBAI_RPC_URL);

declare global {
    interface Window {
      ethereum: any
    }
  }

export const getSigner = () => {
        // const curProvider = window['ethereum'] || window.web3.currentProvider

        const ethersProvider = typeof window === "object" ? new ethers.providers.Web3Provider(window.ethereum) : null
        const provider = new ethers.providers.Web3Provider(window.ethereum);    
        return provider.getSigner();

  //return new Wallet(PK, ethersProvider);
};

export const getAddressFromSigner = () => {
    const accounts = window.ethereum.request({method: "eth_requestAccounts"})
  return accounts[0]
  //return getSigner().address;
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