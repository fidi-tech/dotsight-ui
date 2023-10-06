import React, {useCallback, useState, useRef, useMemo} from 'react';
import { HexColorPicker, HexColorInput } from 'react-colorful';

import useClickOutside from '@/shared/ui/hooks/useClickOutside';
import {isHexColor} from '@/shared/lib/color';

import styles from './index.module.scss';

type Props = {
  onChange: (s: string) => void,
}

const ColorInput = ({onChange}: Props) => {
  const [color, setColor] = useState('');
  const _onChange = useCallback((value: string) => {
    onChange(value);
    setColor(value);
  }, [setColor, onChange]);

  const popover = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  useClickOutside(popover, close);

  const colorStyle = useMemo(() => {
    if (color && isHexColor(color)) {
      return {backgroundColor: color};
    }
  }, [color]);

  return (
    <div className={styles.root}>
      <HexColorInput color={color} onChange={_onChange} onFocus={open} onClick={open} prefixed />
      <div className={styles.example} style={colorStyle}>
        {isOpen && (
          <div className={styles.popover} ref={popover}>
            <HexColorPicker color={color} onChange={_onChange} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorInput;
