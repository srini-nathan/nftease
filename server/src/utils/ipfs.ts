import IPFS from "ipfs-core";

export default async () => {
  return await IPFS.create();
};
