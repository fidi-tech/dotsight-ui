import React, {forwardRef} from 'react';
import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';

import {ConfiguratorHandle} from '@/entities/widget/lib/widget';

import type {Parameters, Customization} from '../params';
import {useEnhance} from '../hooks/configurator';
import styles from './index.module.scss';

const Configurator = forwardRef<ConfiguratorHandle<Parameters, Customization>, object>(
  (_, ref) => {
    const {
      parametersFormRef,
      parametersSchema,
      parametersFormData,
      setParametersFormData,
      customizationFormRef,
      customizationSchema,
      customizationFormData,
      setCustomizationFormData,
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
          onChange={(e) => setParametersFormData(e.formData)}
          onError={console.error}
        />
        <Form
          ref={customizationFormRef}
          schema={customizationSchema}
          uiSchema={{
            "ui:submitButtonOptions": {
              "norender": true,
            },
          }}
          validator={validator}
          showErrorList={false}
          formData={customizationFormData}
          onChange={(e) => setCustomizationFormData(e.formData)}
          onError={console.error}
        />
      </div>
    )
  }
);
Configurator.displayName = "SingleMetricConfigurator";

export default Configurator;
