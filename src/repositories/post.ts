import { gql } from "@apollo/client"
import { apolloClient } from "../utils/apolloClient"
import { uploadIpfs } from '../ipfs';

const CREATE_POST_TYPED_DATA = `
  mutation($request: CreatePublicPostRequest!) { 
    createPostTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          PostWithSig {
            name
            type
          }
        }
      domain {
        name
        chainId
        version
        verifyingContract
      }
      value {
        nonce
        deadline
        profileId
        contentURI
        collectModule
        collectModuleData
        referenceModule
        referenceModuleData
      }
    }
  }
}
`;

const createPostTypedData = (createPostTypedDataRequest: any) => {
  return apolloClient.mutate({
    mutation: gql(CREATE_POST_TYPED_DATA),
    variables: {
      request: createPostTypedDataRequest,
    },
  });
};

export const createPost = async (filePath: string) => {
    const profileId = localStorage.getItem('profile_id');
    const ipfsResult = await uploadIpfs(filePath);
    console.log('create post: ipfs result', ipfsResult);
    const createPostRequest = {
        profileId,
        contentURI: 'ipfs://' + ipfsResult.path,
        collectModule: {
          revertCollectModule: true,
        },
        referenceModule: {
          followerOnlyReferenceModule: false,
        },
      };
  const result = await createPostTypedData(createPostRequest);
  console.log('create post: createPostTypedData', result);

  const typedData = result.data.createPostTypedData.typedData;
  console.log('create post: typedData', typedData);

  return result.data;  
};