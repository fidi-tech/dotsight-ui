import React from 'react';
import {getUiOptions, IdSchema, Registry, RJSFSchema, UiSchema} from '@rjsf/utils';

import ColorArrayFieldItemTemplate from '@/shared/ui/ColorArrayFieldItemTemplate';

import styles from './index.module.scss';

type Props = {
  idSchema: IdSchema;
  uiSchema?: UiSchema;
  items: Array<any>;
  registry: Registry;
  required?: boolean;
  schema: RJSFSchema;
  title: string;
};

const ColorArrayFieldTemplate = (props: Props) => {
  const { uiSchema, items, schema } = props;

  const uiOptions = getUiOptions(uiSchema);
  if (!items.length) {
    return null;
  }
  return (
    <div>
      <p className={styles.title}>{uiOptions.description || schema.description}</p>
      <div>
        {items.map(({ key, ...itemProps }) => <ColorArrayFieldItemTemplate key={key} {...itemProps} />)}
      </div>
    </div>
  );
}

export default ColorArrayFieldTemplate;