import React from 'react';
import Grid from '@mui/material/Grid';
import {ObjectFieldTemplateProps} from '@rjsf/utils';

const ObjectFieldTemplate = ({
  properties,
  formData,
}: ObjectFieldTemplateProps) =>
  <Grid spacing={6}>
    {properties.map((element, index) => {
      if (element.name === 'palette' && !(formData.count > 0)) {
        return null;
      }
      return (
        <Grid
          item={true}
          xs={6}
          key={index}
          style={{ marginBottom: '20px' }}
        >
          {element.content}
        </Grid>
      )
    })}
  </Grid>;

export default ObjectFieldTemplate;