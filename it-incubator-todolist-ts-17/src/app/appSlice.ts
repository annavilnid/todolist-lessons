import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type InitialStateType = {
    status: RequestStatusType;
    error: string | null;
    isInitialized: boolean;
};

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
};

// slice - редьюсеры создаем с помощью функции createSlice
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
        setAppInitializedAC: (state, action: PayloadAction<{ value: boolean }>) => {
            // логику в подредьюсерах пишем мутабельным образом,
            // т.к. иммутабельность достигается благодаря immer.js
            state.isInitialized = action.payload.value
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

