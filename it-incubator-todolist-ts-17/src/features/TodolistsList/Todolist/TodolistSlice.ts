import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: Array<TodolistDomainType> = []
// slice - редьюсеры создаем с помощью функции createSlice
const slice = createSlice({
    // важно чтобы не дублировалось, будет в качетве приставки согласно соглашению redux ducks
    name: 'todolists',
    //❗Если будут писаться тесты на slice или где понадобится типизация,
    // тогда выносим initialState наверх
    initialState,
    // состоит из подредьюсеров, каждый из которых эквивалентен одному оператору case в switch, как мы делали раньше (обычный redux)
    reducers: {
        //❗в жизни setIsLoggedInAC c AC писать не надо.
        // оставим только для того чтобы делать плавный рефакторинг
        // Объект payload. Типизация через PayloadAction
        removeTodolistAC: (state, action: PayloadAction<{ id: string }>) => {
            // логику в подредьюсерах пишем мутабельным образом,
            // т.к. иммутабельность достигается благодаря immer.js
            const { id } = action.payload;
            const index = state.findIndex(tl => tl.id === id);
            if (index !== -1) {
                state.splice(index, 1);
            }
        }
    }
});

// Создаем reducer с помощью slice
export const todolistsReducer = slice.reducer;
// Action creator также достаем с помощью slice
export const {removeTodolistAC} = slice.actions
// либо вот так. ❗Делаем так, в дальнейшем пригодиться
// export const authActions = slice.actions

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}