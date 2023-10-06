import {useSelector} from 'react-redux';

import {selectAll} from '@/entities/pipeline/model';
import {PipelineListItem} from '@/entities/pipeline/ui/pipelineListItem';

import styles from './index.module.scss';

export const PipelinesList = () => {
  const pipelines = useSelector(selectAll);

  return (
    <div className={styles.root}>
      {Boolean(pipelines) && pipelines.map(pipeline => (
        <div key={pipeline.id}>
          <PipelineListItem id={pipeline.id} name={pipeline.name} />
        </div>
      ))}
    </div>
  );
};
