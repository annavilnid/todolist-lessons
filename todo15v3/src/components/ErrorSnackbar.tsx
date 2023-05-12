import React, { useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch, useAppSelector} from "../app/store";
import {setRequestError} from "../app/app-reduser";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export function ErrorSnackbar() {
  // const error = useSelector<AppRootStateType, null | string>((state) => state.app.error)
  const error = useAppSelector<null | string>((state) => state.app.error)
  const dispatch = useAppDispatch()
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(setRequestError(null))
  }
  return (
    <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity='error' sx={{width: '100%'}}>
        {error}
      </Alert>
    </Snackbar>
  )
}