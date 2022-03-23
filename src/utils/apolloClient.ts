import { ApolloClient, InMemoryCache } from "@apollo/client"


const URL = "https://api-mumbai.lens.dev/"

export const apolloClient = new ApolloClient({
  uri: URL,
  cache: new InMemoryCache(),
})