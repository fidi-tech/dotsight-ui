import React from 'react';
import Grid from '@mui/material/Grid';
import {ObjectFieldTemplateProps} from '@rjsf/utils';

import styles from './index.module.scss';

const ObjectFieldTemplate = ({properties}: ObjectFieldTemplateProps) =>
  <Grid>
    {properties.map((element, index) =>
      <Grid
        item
        key={index}
        className={styles.row}
      >
        {element.content}
      </Grid>
    )}
  </Grid>;

export default ObjectFieldTemplate;