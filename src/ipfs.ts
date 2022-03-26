import { create } from 'ipfs-http-client';
import { v4 as uuidv4 } from 'uuid';

const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
});

export const uploadIpfs = async (filePath: string, description: string) => {
  const result = await client.add(
    JSON.stringify({
      version: '1.0.0',
      metadata_id: uuidv4(),
      description: description,
      external_url: null,
      image: null,
      imageMimeType: null,
      name: 'Name',
      attributes: [],
      media: [
        {
          item: filePath,
          type: 'image/jpeg',
        },
      ],
      appId: 'mame',
    })
  );

  console.log('upload result ipfs', result);
  return result;
};