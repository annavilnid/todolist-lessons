import {Dispatch} from 'redux'
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../../app/app-reducer'
import {authAPI, LoginParamsType} from '../../api/todolists-api'
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils'
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "app/store";

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
});

export const authReducer = slice.reducer;
export const authActions = slice.actions;


// thunks
export const loginTC =
  (data: LoginParamsType): AppThunk =>
    (dispatch) => {
      dispatch(setAppStatusAC({status: "loading"}));
      authAPI
        .login(data)
        .then((res) => {
          if (res.data.resultCode === 0) {
            dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
            dispatch(setAppStatusAC({status: "succeeded"}));
          } else {
            handleServerAppError(res.data, dispatch);
          }
        })
        .catch((error) => {
          handleServerNetworkError(error, dispatch);
        });
    };

export const logoutTC = (): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC({status: "loading"}));
  authAPI
    .logout()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }));
        dispatch(setAppStatusAC({status: "succeeded"}));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

// types
