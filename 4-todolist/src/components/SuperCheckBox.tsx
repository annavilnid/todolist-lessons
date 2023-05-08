import React, {ChangeEvent, ChangeEventHandler, FC} from 'react';

type PropsType = {
  checked: boolean
  callback: (newIsDone: boolean) => void
}

export const SuperCheckBox: FC<PropsType> = ({checked, callback}) => {

  const SuperCheckBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
    callback(e.currentTarget.checked)
  }

  return (
    <input type="checkbox" onChange={SuperCheckBoxHandler} checked={checked}/>
  );
};
