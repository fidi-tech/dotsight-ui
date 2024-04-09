import {useCallback, useEffect, useState} from 'react';

type Props = {
  initial?: boolean;
  controllable?: boolean;
  onChange?: (enabled: boolean) => void;
}

export const useEnhance = ({initial, controllable, onChange}: Props) => {
  const [isChecked, setIsChecked] = useState(Boolean(initial));
  useEffect(() => {
    setIsChecked(Boolean(initial));
  }, [initial]);
  const _onChange = useCallback(() => {
    if (controllable) {
      return;
    }
    const value = !isChecked;
    setIsChecked(value);
    if (onChange) {
      onChange(value);
    }
  }, [isChecked, setIsChecked, onChange, controllable]);
  return {
    isChecked,
    onChange: _onChange,
  };
}