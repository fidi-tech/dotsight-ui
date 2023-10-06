import React, {useCallback, useMemo} from 'react';
import Select from 'react-select';

export type Option = {
  value: string;
  label: string;
}

type Props = {
  options: Option[],
  selected?: string,
  onSelect: (option: Option) => void,
  isDisabled?: boolean,
}

export const Selector = ({options, selected, onSelect, isDisabled = false}: Props) => {
  const selectedOption = useMemo(
    () => options.find(option => option.value === selected),
    [options, selected],
  );
  const onChange = useCallback((o: Option | null) => {
    if (o) {
      onSelect(o);
    }
  }, [onSelect]);

  return (
    <Select options={options} value={selectedOption} onChange={onChange} isDisabled={isDisabled} />
  )
}
