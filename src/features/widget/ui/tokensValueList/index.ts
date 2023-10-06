import {DISTRIBUTION_DATASHAPE_CODE} from '@/entities/datashape/model/distribution';

import Widget from './widget';
import Configurator from './configurator';
import Placeholder from './placeholder';

export const type = 'tokensValueList';
export const dataShape = DISTRIBUTION_DATASHAPE_CODE;

const tokensValueList = {
  title: 'Tokens value list',
  type,
  dataShape,
  Widget,
  Configurator,
  Placeholder,
};

export default tokensValueList;
