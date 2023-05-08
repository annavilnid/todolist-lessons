import React, {ChangeEvent} from 'react';

type PropsType = {
  checked: boolean,
  onChange: (newIsDone: boolean) => void
}

export const SuperCheckBox = (props: PropsType) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.currentTarget.checked)
  }
  return (
      <input type="checkbox"
        checked={props.checked}
        onChange={onChangeHandler}
      />
  );
};

