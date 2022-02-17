import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useEffect, useState } from "react";
import { useMoralisWeb3Api, useMoralisWeb3ApiCall } from "react-moralis";
import { useIPFS } from "./useIPFS";

export const useNFTTokenIds = (addrs) => {
  const { token } = useMoralisWeb3Api();
  const { chainId } = useMoralisDapp();
  const { resolveLink } = useIPFS();
  const [NFTTokenIds, setNFTTokenIds] = useState([]);
  const {
    fetch: getNFTTokenIds,
    data,
    error,
    isLoading,
  } = useMoralisWeb3ApiCall(token.getAllTokenIds, {
    chain: chainId,
    address: addrs,
  });

  useEffect(() => {
    if (data?.result) {
      const NFTs = data.result;
      const nftsWithImage = NFTs.map((NFT) => {
        if (NFT?.metadata) {
          const metadata = JSON.parse(NFT.metadata);
          return { ...NFT, metadata, image: resolveLink(metadata?.image) };
        } else {
          return NFT;
        }
      });

      setNFTTokenIds(nftsWithImage);
    }
  }, [data, resolveLink]);

  return { getNFTTokenIds, NFTTokenIds, error, isLoading };
};
