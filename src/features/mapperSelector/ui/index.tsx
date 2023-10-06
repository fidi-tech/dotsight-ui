import React, {forwardRef, Ref} from 'react';
import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';

import {PipelineId} from '@/entities/pipeline/model/types';
import {Selector} from '@/shared/ui/Selector';

import styles from './index.module.scss';
import useEnhance from '../lib/hooks';

type Props = {
  id: PipelineId,
}

const MapperSelector = ({id}: Props, ref: Ref<any>) => {
  const {
    selectedType,
    onOptionSelect,
    typeOptions,
    isDisabled,
    config,
    configSchema,
    handleConfigUpdate,
    formRef,
  } = useEnhance({pipelineId: id, ref});

  return (
    <div className={styles.root}>
      <div className={styles.main}>
        <div className={styles.title}>What mapper do you want to use?</div>
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
          formData={config}
          onChange={handleConfigUpdate}
          onError={console.error}
        />
      }
    </div>
  )
}

export default forwardRef(MapperSelector);
