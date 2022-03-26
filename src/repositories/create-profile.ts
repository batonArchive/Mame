import { gql } from "@apollo/client"
import { apolloClient } from "../utils/apolloClient"
import { login } from './login';
import { getAccount } from "./ethers";

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

export const createProfile = async () => {
  const address = getAccount();
  console.log('create profile: address', address);

  await login();

  const createProfileResult = await createProfileRequest({
    handle: new Date().getTime().toString(),
  });

  console.log('profile created', createProfileResult.data);
  return createProfileResult.data;
};