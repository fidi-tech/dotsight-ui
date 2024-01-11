import * as React from 'react';
import cx from 'classnames';

import styles from './index.module.scss';

type Option = {
  id: string;
  title: string;
};

type OptionProps = Option & {
  isActive: boolean;
  onClick: (id: string) => void;
};

const TogglerOption = ({id, title, isActive, onClick: _onClick}: OptionProps) => {
  const onClick = React.useCallback(() => _onClick(id), [_onClick, id]);
  return (
    <div
      className={cx(styles.option, ({[styles.activeOption]: isActive}))}
      onClick={onClick}
    >
      {title}
    </div>
  );
};

export type Props = {
  options: Option[];
  activeOptionId: string;
  onChange: (optionId: string) => void;
};

const Toggler = ({options, activeOptionId, onChange}: Props) => (
  <div className={styles.root}>
    {options.map(option => (
      <TogglerOption
        key={option.id}
        id={option.id}
        title={option.title}
        isActive={option.id === activeOptionId}
        onClick={onChange}
      />
    ))}
  </div>
);

export default Toggler;
