import { gql } from "@apollo/client"
import { apolloClient } from "../utils/apolloClient"
import { getAccount } from "./ethers";
import { BigNumber, utils } from 'ethers';
import { pollUntilIndexed } from '../indexer/has-transaction-been-indexed';

const CREATE_PROFILE = `
  mutation($request: CreateProfileRequest!) { 
    createProfile(request: $request) {
      ... on RelayerResult {
        txHash
      }
      ... on RelayError {
        reason
      }
			__typename
    }
 }
`;

const createProfileRequest = (createProfileRequest: {
  handle: string;
  profilePictureUri?: string;
  followNFTURI?: string;
}) => {
  return apolloClient.mutate({
    mutation: gql(CREATE_PROFILE),
    variables: {
      request: createProfileRequest,
    },
  });
};

export const createProfile = async (handle: string) => {
  const address = getAccount();
  console.log('create profile: address', address);

  const createProfileResult = await createProfileRequest({
    handle: handle,
  });

  // const result = await pollUntilIndexed(createProfileResult.data.createProfile.txHash);
  // const logs = result.txReceipt.logs;
  // const topicId = utils.id(
  //   'ProfileCreated(uint256,address,address,string,string,address,bytes,string,uint256)'
  // );
  // const profileCreatedLog = logs.find((l: any) => l.topics[0] === topicId);
  // let profileCreatedEventLog = profileCreatedLog.topics;
  // const profileId = utils.defaultAbiCoder.decode(['uint256'], profileCreatedEventLog[1])[0];
  // console.log('profile_id', BigNumber.from(profileId).toHexString());

  // localStorage.setItem('profile_id', profileId);

  return "profileId";
};