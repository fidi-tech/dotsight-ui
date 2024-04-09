import React, {useCallback} from 'react';

import {Icons} from '@/shared/ui/icons';
import {WidgetId} from '@/entities/widget/model';
import PublicityToggler from '@/features/PublicityToggler';
import {getRawShareLink} from '@/app/widget/[id]/share/utils';
import Copyable from '@/shared/ui/Copyable';

import styles from './index.module.scss';
import {useEnhance} from './hooks';

type Props = {
  id: WidgetId;
}

const ShareButton = ({id}: Props) => {
  const {isPublic, toggle} = useEnhance(id);

  return (
    <div className={styles.root} onClick={toggle}>
      {isPublic && (
        <div onClick={e => e.stopPropagation()}>
          <Copyable value={getRawShareLink(id)}>
            <div className={styles.icon}>
              <Icons.Export />
            </div>
          </Copyable>
        </div>
      )}
      <PublicityToggler id={id} controllable />
    </div>
  )
}

export default ShareButton;