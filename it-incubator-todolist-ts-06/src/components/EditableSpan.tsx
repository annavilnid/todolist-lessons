import React, {ChangeEvent, useState} from 'react';

type PropsType = {
  oldTitle: string
  callback: (title: string)=>void
}

export const EditableSpan = (props: PropsType) => {
  const [updateTitle, setUpdateTitle] = useState<string>(props.oldTitle)
  const [editMode, setEditMode] = useState<boolean>(false)

  const setTitle = () => {
    props.callback(updateTitle)
  }

  const onDoubleClickHandler = () => {
    setEditMode(!editMode)
    editMode && setTitle()
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdateTitle(e.currentTarget.value)
  }

  return (
    editMode
      ? <input type='text' value={updateTitle} onChange={onChangeHandler} onBlur={onDoubleClickHandler} autoFocus/>
      : <span onDoubleClick={onDoubleClickHandler}>{props.oldTitle}</span>
  );
};