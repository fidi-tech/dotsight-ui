import React, {ChangeEvent} from 'react';

type Props = {
  id?: string;
  name?: string;
  checked?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = ({children, id, checked, name, onChange}: React.PropsWithChildren<Props>) => {
  return (
    <div>
      <input type="checkbox" id={id} name={name} checked={checked} onChange={onChange} />
      <label htmlFor={id}>{children}</label>
    </div>
  )
}
