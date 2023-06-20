import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// slice - редьюсеры создаем с помощью функции createSlice
const slice = createSlice({
    // важно чтобы не дублировалось, будет в качетве приставки согласно соглашению redux ducks
    name: 'auth',
    //❗Если будут писаться тесты на slice или где понадобится типизация,
    // тогда выносим initialState наверх
    initialState: {
        isLoggedIn: false
    },
    // состоит из подредьюсеров, каждый из которых эквивалентен одному оператору case в switch, как мы делали раньше (обычный redux)
    reducers: {
        //❗в жизни setIsLoggedInAC c AC писать не надо.
        // оставим только для того чтобы делать плавный рефакторинг
        // Объект payload. Типизация через PayloadAction
        setIsLoggedInAC: (state, action: PayloadAction<{ value: boolean }>) => {
            // логику в подредьюсерах пишем мутабельным образом,
            // т.к. иммутабельность достигается благодаря immer.js
            state.isLoggedIn = action.payload.value
        }
    }
})

// Создаем reducer с помощью slice
export const authReducer = slice.reducer;
// Action creator также достаем с помощью slice
export const {setIsLoggedInAC} = slice.actions
// либо вот так. ❗Делаем так, в дальнейшем пригодиться
// export const authActions = slice.actions