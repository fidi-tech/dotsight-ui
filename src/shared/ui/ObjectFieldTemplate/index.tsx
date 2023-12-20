import React from 'react';
import Grid from '@mui/material/Grid';
import {ObjectFieldTemplateProps} from '@rjsf/utils';

const ObjectFieldTemplate = ({properties}: ObjectFieldTemplateProps) =>
  <Grid>
    {properties.map((element, index) =>
      <Grid
        item
        key={index}
        style={{ marginBottom: '20px' }}
      >
        {element.content}
      </Grid>
    )}
  </Grid>;

export default ObjectFieldTemplate;