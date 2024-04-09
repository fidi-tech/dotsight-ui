import React from 'react';

import {getRawShareLink} from '@/app/widget/[id]/share/utils';
import {Icons} from '@/shared/ui/icons';
import Copyable from '@/shared/ui/Copyable';
import {WidgetId} from '@/entities/widget/model';

import Action from '../Action';

type Props = {
  id: WidgetId;
};

const ShareLink = ({id}: Props) => {
  return (
    <Copyable value={getRawShareLink(id)}>
      <Action>
        <Icons.Export />
      </Action>
    </Copyable>
  );
}

export default ShareLink;