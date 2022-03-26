import { gql } from "@apollo/client"
import { apolloClient } from "../utils/apolloClient"
import { getAccount, signMessage } from "./ethers"

const GET_CHALLENGE = `
  query($request: ChallengeRequest!) {
    challenge(request: $request) { text }
  }
`;

export const generateChallenge = (address: string) => {
  return apolloClient.query({
    query: gql(GET_CHALLENGE),
    variables: {
      request: {
        address,
      },
    },
  });
};

const AUTHENTICATION = `
  mutation($request: SignedAuthChallenge!) { 
    authenticate(request: $request) {
      accessToken
      refreshToken
    }
 }
`;

const authenticate = (address: string, signature: string) => {
  return apolloClient.mutate({
    mutation: gql(AUTHENTICATION),
    variables: {
      request: {
        address,
        signature,
      },
    },
  });
};

export const login = async () => {
  const address = await getAccount()
  const token = localStorage.getItem('auth_token');
  console.log('login: address', address);

  const challengeResponse = await generateChallenge(address);
  const signature = await signMessage(challengeResponse.data.challenge.text)
  const accessTokens = await authenticate(address, signature);
  localStorage.setItem('auth_token', accessTokens.data.authenticate.accessToken);
  localStorage.setItem('refresh_token', accessTokens.data.authenticate.refreshToken);
  return accessTokens.data.authenticate;
};
