import React, {FC} from 'react';
import {FilterValuesType} from "../App";

type buttonProps = {
  name: string
  onClickHandler: () => void
};

export const Button: FC<buttonProps> = ({name, onClickHandler}) => {
  return (
    <button onClick={onClickHandler}>{name}</button>
  );
};

