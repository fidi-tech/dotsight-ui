import {NFT_LIST_DATASHAPE_CODE} from '@/entities/datashape/model/nftList';

import Widget from './widget';
import Configurator from './configurator';
import Placeholder from './placeholder';

const type = 'nftList';
const dataShape = NFT_LIST_DATASHAPE_CODE;

const nftGrid = {
  title: 'NFT Grid',
  type,
  dataShape,
  Widget,
  Configurator,
  Placeholder,
};

export default nftGrid;
