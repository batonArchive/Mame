import { gql } from "@apollo/client"
import { apolloClient } from "../utils/apolloClient"
import { login } from './login';
import { getAccount } from "./ethers";

const REFRESH_AUTHENTICATION = `
  mutation($request: RefreshRequest!) { 
    refresh(request: $request) {
      accessToken
      refreshToken
    }
 }
`;

const refreshAuth = (refreshToken: string) => {
  return apolloClient.mutate({
    mutation: gql(REFRESH_AUTHENTICATION),
    variables: {
      request: {
        refreshToken,
      },
    },
  });
};

export const refresh = async () => {
  const address = await getAccount();
  console.log('refresh: address', address);

  const accessTokens = await login();
  console.log(accessTokens);

  const newAccessToken = await refreshAuth(
    accessTokens.refreshToken
  );

  localStorage.setItem('auth_token', newAccessToken.data.refresh.accessToken);
  localStorage.setItem('refresh_token', newAccessToken.data.refresh.refreshToken);

  return newAccessToken.data;
};