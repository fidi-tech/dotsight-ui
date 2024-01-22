export const NFT_LIST_DATASHAPE_CODE = 'nft-list';

export type NFTListDatashape = {
  items: Array<{
    id: string;
    contractId: string;
    chain: string;
    name: string;
    contentType: string;
    content: string;
    thumbnailUrl: string;
    detailUrl: string;
    contractName: string;
    lastPrice?: number;
  }>;
};
