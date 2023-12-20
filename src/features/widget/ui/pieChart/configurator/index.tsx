import React, {forwardRef} from 'react';
import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
import {RegistryWidgetsType, TemplatesType} from '@rjsf/utils';

import {ConfiguratorHandle} from '@/entities/widget/lib/widget';
import ColorArrayFieldTemplate from '@/shared/ui/ColorArrayFieldTemplate';
import ArrayFieldTemplate from '@/shared/ui/WalletsArrayFieldTemplate';
import ObjectFieldTemplate from '@/shared/ui/ObjectFieldTemplate';
import {PipelineId} from '@/entities/pipeline/model';
import PaletteRadio from '@/shared/ui/PaletteRadio';

import type {Parameters, Customization} from '../params';
import {useEnhance} from '../hooks/configurator';
import styles from './index.module.scss';

const customFields: Partial<TemplatesType> = { ArrayFieldTemplate: ColorArrayFieldTemplate };

const widgets: RegistryWidgetsType = {
  RadioWidget: PaletteRadio,
};

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
              "ui:widget": "radio",
            },
            "ui:ObjectFieldTemplate": ObjectFieldTemplate,
          }}
          validator={validator}
          showErrorList={false}
          formData={customizationFormData}
          onChange={data => setCustomizationFormData(data.formData)}
          onError={console.error}
          templates={customFields}
          widgets={widgets}
        />
      </div>
    )
  }
);
Configurator.displayName = "PieChartConfigurator";

export default Configurator;
