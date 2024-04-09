import {WidgetId} from '@/entities/widget/model';

import {Icons} from '@/shared/ui/icons';
import {InPlaceEdit} from '@/shared/ui/InPlaceEdit';

import {useEnhance} from './hooks';
import styles from './index.module.scss';

type Props = {
  id: WidgetId,
}
export const Breadcrumbs = ({id}: Props) => {
  const {name, canModify, onSaveName} = useEnhance(id);
  if (!name) {
    return null;
  }
  return (
    <div className={styles.root}>
      <div className={styles.icon}>
        <Icons.Tiles />
      </div>
      <div className={styles.name}>
        <InPlaceEdit value={name} onSave={onSaveName} disabled={!canModify} />
      </div>
    </div>
  );
}