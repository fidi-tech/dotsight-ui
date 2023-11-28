import React, {forwardRef} from 'react';
import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
import {TemplatesType} from '@rjsf/utils';

import {ConfiguratorHandle} from '@/entities/widget/lib/widget';
import ColorInput from '@/shared/ui/ColorInput';
import ColorArrayFieldTemplate from '@/shared/ui/ColorArrayFieldTemplate';

import {useEnhance} from '../hooks/configurator';
import type {Parameters, Customization} from '../params';
import ObjectFieldTemplate from './templates/ObjectFieldTemplate';
import styles from './index.module.scss';

const customFields: Partial<TemplatesType> = { ArrayFieldTemplate: ColorArrayFieldTemplate };

const Configurator = forwardRef<ConfiguratorHandle<Parameters, Customization>, object>(
  (_, ref) => {
    const {
      parametersFormRef,
      parametersFormData,
      setParametersFormData,
      parametersSchema,
      customizationFormRef,
      customizationFormData,
      setCustomizationFormData,
      customizationSchema,
    } = useEnhance({ref});

    return (
      <div className={styles.root}>
        <Form
          ref={parametersFormRef}
          schema={parametersSchema}
          uiSchema={{
            "ui:submitButtonOptions": {
              "norender": true,
            },
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
