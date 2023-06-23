import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Dispatch} from 'redux'
import {authAPI} from '../api/todolists-api'
import {authActions} from '../features/Login/auth-reducer'

const initialState = {
    status: "idle" as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
}

export type InitialStateType = typeof initialState

const slice = createSlice({
    // важно чтобы не дублировалось, будет в качетве приставки согласно соглашению redux ducks
    name: 'app',
    //❗Если будут писаться тесты на slice или где понадобится типизация,
    // тогда выносим initialState наверх
    initialState,
    // состоит из подредьюсеров, каждый из которых эквивалентен одному оператору case в switch, как мы делали раньше (обычный redux)
    reducers: {
        //❗в жизни  AC писать не надо.
        // оставим только для того чтобы делать плавный рефакторинг
        // Объект payload. Типизация через PayloadAction
        setAppErrorAC: (state, action: PayloadAction<{ error: string | null }>) => {
            // логику в подредьюсерах пишем мутабельным образом,
            // т.к. иммутабельность достигается благодаря immer.js
            state.error = action.payload.error
        },
        setAppStatusAC: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            // логику в подредьюсерах пишем мутабельным образом,
            // т.к. иммутабельность достигается благодаря immer.js
            state.status = action.payload.status
        },
        setAppInitializedAC: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
            // логику в подредьюсерах пишем мутабельным образом,
            // т.к. иммутабельность достигается благодаря immer.js
            state.isInitialized = action.payload.isInitialized
        },
    }
})

// Создаем reducer с помощью slice
export const appReducer = slice.reducer;
// Action creator также достаем с помощью slice
export const {setAppErrorAC, setAppStatusAC, setAppInitializedAC} = slice.actions
// либо вот так. ❗Делаем так, в дальнейшем пригодиться
// export const appActions = slice.actions

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
        } else {

        }

        dispatch(setAppInitializedAC({isInitialized: true}));
    })
}

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>


type ActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | ReturnType<typeof setAppInitializedAC>
