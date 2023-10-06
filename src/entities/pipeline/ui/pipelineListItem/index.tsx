import Link from 'next/link'

import {Module} from '@/shared/ui/Module';
import {PipelineId} from '@/entities/pipeline/model/types';

import styles from './index.module.css';

type Props = {
  id: PipelineId;
  name: string;
};

export const PipelineListItem = ({id, name}: Props) => {
  return (
    <Link href={`/pipeline/${id}`} className={styles.root}>
      <Module>
        <div className={styles.root}>
          <div className={styles.name}>
            {name}
          </div>
        </div>
      </Module>
    </Link>
  );
}
