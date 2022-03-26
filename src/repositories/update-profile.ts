import { gql } from "@apollo/client"
import { apolloClient } from "../utils/apolloClient"
import { login } from './login';
import { getAccount } from "./ethers";

const UPDATE_PROFILE = `
  mutation($request: UpdateProfileRequest!) { 
    updateProfile(request: $request) {
      id
  }
 }
`;

const updateProfileRequest = (profileInfo: any) => {
  return apolloClient.mutate({
    mutation: gql(UPDATE_PROFILE),
    variables: {
      request: profileInfo,
    },
  });
};

export const updateProfile = async (profileId: string) => {
  const address = await getAccount();
  console.log('update profile: address', address);

  await login();

  await updateProfileRequest({
    profileId,
    name: 'josh stevens',
    bio: 'hey this is my profile',
    location: 'UK',
    website: null,
    twitterUrl: null,
    coverPicture: null,
  });

};
