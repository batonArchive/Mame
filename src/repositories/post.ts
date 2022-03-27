import { gql } from "@apollo/client"
import { apolloClient } from "../utils/apolloClient"
import { uploadIpfs } from '../ipfs';
import { pollUntilIndexed } from '../indexer/has-transaction-been-indexed';
import { getAddressFromSigner, signedTypeData, splitSignature } from '../ethers.service';
import { lensHub } from '../lens-hub';
import { BigNumber, utils } from 'ethers';

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

// filePath: あらかじめ用意したお題画像のURL, description: キャプション文言, そのほかはattributesにkey:valueで入れる。
// 作ったjson https://ipfs.io/ipfs/{ipfsResult.path}
export const createPost = async (filePath: string, description: string, attributes: any[]) => {
    const profileId = localStorage.getItem('profile_id');
    const ipfsResult = await uploadIpfs(filePath, description, attributes);
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

  const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);
  console.log('create post: signature', signature);

  const { v, r, s } = splitSignature(signature);

  const tx = await lensHub.postWithSig({
    profileId: typedData.value.profileId,
    contentURI: typedData.value.contentURI,
    collectModule: typedData.value.collectModule,
    collectModuleData: typedData.value.collectModuleData,
    referenceModule: typedData.value.referenceModule,
    referenceModuleData: typedData.value.referenceModuleData,
    sig: {
      v,
      r,
      s,
      deadline: typedData.value.deadline,
    },
  });
  console.log('create post: tx hash', tx.hash);

  //console.log('create post: poll until indexed');
  const indexedResult = await pollUntilIndexed(tx.hash);

  console.log('create post: profile has been indexed', result);

  const logs = indexedResult.txReceipt.logs;

  console.log('create post: logs', logs);

  const topicId = utils.id(
    'PostCreated(uint256,uint256,string,address,bytes,address,bytes,uint256)'
  );
  console.log('topicid we care about', topicId);

  const profileCreatedLog = logs.find((l: any) => l.topics[0] === topicId);
  console.log('create post: created log', profileCreatedLog);

  let profileCreatedEventLog = profileCreatedLog.topics;
  console.log('create post: created event logs', profileCreatedEventLog);

  const publicationId = utils.defaultAbiCoder.decode(['uint256'], profileCreatedEventLog[2])[0];

  console.log('create post: contract publication id', BigNumber.from(publicationId).toHexString());
  console.log(
    'create post: internal publication id',
    profileId + '-' + BigNumber.from(publicationId).toHexString()
  );


  return result.data;  
};