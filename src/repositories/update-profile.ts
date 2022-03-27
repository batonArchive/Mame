import { gql } from "@apollo/client"
import { apolloClient } from "../utils/apolloClient"
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

export const updateProfile = async (name: string, bio: string) => {
  const address = await getAccount();
  console.log('update profile: address', address);

  const profileId = localStorage.getItem('profile_id');

  await updateProfileRequest({
    profileId,
    name: name,
    bio: bio,
  });

};
