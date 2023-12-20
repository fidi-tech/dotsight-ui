import React, {useCallback} from 'react';
import {WidgetProps} from '@rjsf/utils';
import cx from 'classnames';

import {Palette} from '@/shared/ui/Palette';
import {getColorsFromPaletteByVariant, PaletteVariant} from '@/shared/ui/styles/palettes';

import styles from './index.module.scss';

const PaletteRadio = ({options, value, onChange}: WidgetProps) => {
  const { enumOptions } = options;
  const onSelect = useCallback((value: PaletteVariant) => {
    onChange(value);
  }, [onChange]);
  return (
    <div>
      <p className={styles.title}>Color Palette</p>
      <div className={styles.content}>
        {enumOptions?.length &&
          enumOptions.map(option => {
            const isSelected = option.value === value;
            return (
              <div
                className={cx(styles.palette, isSelected && styles.selected)}
                onClick={onSelect.bind(this, option.value)}
                key={option.value}
              >
                <Palette colors={getColorsFromPaletteByVariant(option.value)} />
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default PaletteRadio;