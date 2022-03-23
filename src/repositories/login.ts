import { gql } from "@apollo/client"
import { apolloClient } from "../utils/apolloClient"
import { getAccount, signMessage } from "./ethers"


export const generateChallenge = async (address: string): Promise<string> => {
   const res = await apolloClient.query({
    query: gql`
      query($request: ChallengeRequest!) {
        challenge(request: $request) { text }
      }
    `,
    variables: {
      request: {
        address,
      },
    },
  })
  console.log("generateChallenge", res)
  return res.data.challenge.text
}

export const authenticate = async (address: string, signature: string): Promise<{accessToken: string, refreshToken: string}> => {
  const res = await apolloClient.mutate({
    mutation: gql`
      mutation($request: SignedAuthChallenge!) { 
        authenticate(request: $request) {
          accessToken
          refreshToken
        }
      }
    `,
    variables: {
      request: {
        address,
        signature,
      },
    },
  })
  console.log("authenticate", res)
  return res.data.authenticate
}

export const login = async () => {
  const account = await getAccount()
  const challengeText = await generateChallenge(account)
  const signature = await signMessage(challengeText)
  const accessTokens = await authenticate(account, signature)
  console.log(accessTokens)
  // {
  //  data: {
  //   authenticate: {
  //    accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjB4YjE5QzI4OTBjZjk0N0FEM2YwYjdkN0U1QTlmZkJjZTM2ZDNmOWJkMiIsInJvbGUiOiJub3JtYWwiLCJpYXQiOjE2NDUxMDQyMzEsImV4cCI6MTY0NTEwNjAzMX0.lwLlo3UBxjNGn5D_W25oh2rg2I_ZS3KVuU9n7dctGIU",
  //    refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjB4YjE5QzI4OTBjZjk0N0FEM2YwYjdkN0U1QTlmZkJjZTM2ZDNmOWJkMiIsInJvbGUiOiJyZWZyZXNoIiwiaWF0IjoxNjQ1MTA0MjMxLCJleHAiOjE2NDUxOTA2MzF9.2Tdts-dLVWgTLXmah8cfzNx7sGLFtMBY7Z9VXcn2ZpE"
  //   }
  // }
}