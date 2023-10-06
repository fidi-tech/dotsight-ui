import React, {createRef, forwardRef, Ref, useCallback, useImperativeHandle} from 'react';
import Form from '@rjsf/mui';
import FormType from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';

import {useDispatch} from '@/infra/providers/redux';
import {PipelineId} from '@/entities/pipeline/model/types';
import {Selector} from '@/shared/ui/Selector';
import {setPipelineDataSource} from '@/entities/pipeline/model/setPipelineDataSource';

import useEnhance from '../lib/hooks';

import styles from './index.module.scss';

type Props = {
  id: PipelineId,
}

const DataSourceSelector = ({id}: Props, ref: Ref<any>) => {
  const dispatch = useDispatch();
  const {
    typeOptions,
    selectedType,
    onOptionSelect,
    configSchema,
    config,
    isDisabled,
  } = useEnhance({pipelineId: id});
  const formRef = createRef<FormType<any, any, any>>();
  const [formData, setFormData] = React.useState(config);

  const next = useCallback(
    () => {
      if (!selectedType || !formData) {
        return;
      }

      dispatch(setPipelineDataSource({
        pipelineId: id,
        type: selectedType,
        config: formData,
      }));
    },
    [dispatch, id, selectedType, formData],
  );
  useImperativeHandle(ref, () => ({
    next: () => {
      if (formRef.current?.validateForm()) {
        next();
      }
    }
  }));

  return (
    <div className={styles.root}>
      <div className={styles.main}>
        <div className={styles.title}>Select Data Source</div>
        <div>
          <Selector options={typeOptions} selected={selectedType} onSelect={onOptionSelect} isDisabled={isDisabled} />
        </div>
      </div>
      {configSchema &&
        <Form
          ref={formRef}
          schema={configSchema}
          uiSchema={{
            "ui:options": {label: false},
            "ui:submitButtonOptions": {
              "norender": true,
            },
            "ui:description": undefined,
            "ui:disabled": isDisabled,
          }}
          validator={validator}
          showErrorList={false}
          formData={formData}
          onChange={(e) => setFormData(e.formData)}
          onError={console.error}
        />
      }
    </div>
  )
}

export default forwardRef(DataSourceSelector);
