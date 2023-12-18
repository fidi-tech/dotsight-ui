import React, {forwardRef} from 'react';
import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
import {TemplatesType} from '@rjsf/utils';

import {ConfiguratorHandle} from '@/entities/widget/lib/widget';
import ColorInput from '@/shared/ui/ColorInput';
import ColorArrayFieldTemplate from '@/shared/ui/ColorArrayFieldTemplate';
import ArrayFieldTemplate from '@/shared/ui/WalletsArrayFieldTemplate';
import ObjectFieldTemplate from '@/shared/ui/ObjectFieldTemplate';
import {PipelineId} from '@/entities/pipeline/model';

import {useEnhance} from '../hooks/configurator';
import type {Parameters, Customization} from '../params';
import styles from './index.module.scss';

const customFields: Partial<TemplatesType> = { ArrayFieldTemplate: ColorArrayFieldTemplate };

const Configurator = forwardRef<ConfiguratorHandle<Parameters, Customization>, {pipelineId: PipelineId}>(
  ({pipelineId}, ref) => {
    const {
      parametersFormRef,
      parametersFormData,
      setParametersFormData,
      parametersSchema,
      customizationFormRef,
      customizationFormData,
      setCustomizationFormData,
      customizationSchema,
    } = useEnhance({ref, pipelineId});

    if (!parametersSchema) {
      return null;
    }

    return (
      <div className={styles.root}>
        <Form
          ref={parametersFormRef}
          schema={parametersSchema}
          uiSchema={{
            "ui:options": {
              title: '',
            },
            'walletIds' : {
              'ui:ArrayFieldTemplate': ArrayFieldTemplate,
            },
            "ui:submitButtonOptions": {
              "norender": true,
            },
            "ui:globalOptions": {
              addable: true,
              orderable: false,
              removable: true,
            },
            "ui:ObjectFieldTemplate": ObjectFieldTemplate,
          }}
          validator={validator}
          showErrorList={false}
          formData={parametersFormData}
          onError={console.error}
          onChange={data => setParametersFormData(data.formData)}
        />
        <Form
          ref={customizationFormRef}
          schema={customizationSchema}
          uiSchema={{
            "ui:submitButtonOptions": {
              "norender": true,
            },
            "ui:globalOptions": {
              addable: false,
              orderable: true,
              removable: false,
            },
            'palette': {
              'items': {
                'ui:widget': ColorInput,
              },
            },
            "ui:ObjectFieldTemplate": ObjectFieldTemplate,
          }}
          validator={validator}
          showErrorList={false}
          formData={customizationFormData}
          onChange={data => setCustomizationFormData(data.formData)}
          onError={console.error}
          templates={customFields}
        />
      </div>
    );
  }
);
Configurator.displayName = "TokensValueListConfigurator";

export default Configurator;
