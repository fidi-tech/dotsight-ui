import {useSelector} from 'react-redux';

import {selectAll} from '@/entities/pipeline/model';
import {PipelineListItem} from '@/entities/pipeline/ui/pipelineListItem';
import {Icons} from '@/shared/ui/icons';
import {Module} from '@/shared/ui/Module';

import styles from './index.module.scss';

export const PipelinesList = () => {
  const pipelines = useSelector(selectAll);
  const nonEmptyList = Boolean(pipelines && pipelines.length);

  return (
    <div className={styles.root}>
      {nonEmptyList && pipelines.map(pipeline => (
        <div key={pipeline.id}>
          <PipelineListItem id={pipeline.id} name={pipeline.name} />
        </div>
      ))}
      {!nonEmptyList && <Module className={styles.empty} dataTestId="empty">
        <Icons.EmptyPipe />
        <p>No Dashboards has been created so far.</p>
      </Module>}
    </div>
  );
};
