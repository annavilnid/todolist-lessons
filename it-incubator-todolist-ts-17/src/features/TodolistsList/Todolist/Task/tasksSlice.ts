import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TaskType} from "../../../../api/todolists-api";
import {UpdateDomainTaskModelType} from "../../tasks-reducer";

const initialState: TasksStateType = {}
// slice - редьюсеры создаем с помощью функции createSlice
const slice = createSlice({
    // важно чтобы не дублировалось, будет в качетве приставки согласно соглашению redux ducks
    name: 'tasks',
    //❗Если будут писаться тесты на slice или где понадобится типизация,
    // тогда выносим initialState наверх
    initialState,
    // состоит из подредьюсеров, каждый из которых эквивалентен одному оператору case в switch, как мы делали раньше (обычный redux)
    reducers: {
        //❗в жизни setIsLoggedInAC c AC писать не надо.
        // оставим только для того чтобы делать плавный рефакторинг
        // Объект payload. Типизация через PayloadAction
        removeTaskAC: (state, action: PayloadAction<{ taskId: string, todolistId: string }>) => {
            // логику в подредьюсерах пишем мутабельным образом,
            // т.к. иммутабельность достигается благодаря immer.js
            const { taskId, todolistId } = action.payload;
            const index = state[todolistId].findIndex(t => t.id === taskId);
            if (index !== -1) {
                state[todolistId].splice(index, 1);
            }
        },
        addTaskAC: (state, action: PayloadAction<{ task: TaskType }>) => {
            // логику в подредьюсерах пишем мутабельным образом,
            // т.к. иммутабельность достигается благодаря immer.js
            const {todoListId, ...rest} = action.payload.task
            state[todoListId].unshift(action.payload.task)

        },
        updateTaskAC: (state, action: PayloadAction<{ taskId: string, model: UpdateDomainTaskModelType, todolistId: string }>) => {
            // логику в подредьюсерах пишем мутабельным образом,
            const {taskId, model, todolistId } = action.payload;
            const tasks = state[todolistId];
            const taskIndex = tasks.findIndex(t => t.id === taskId);
            if (taskIndex !== -1) {
                const updatedTask = { ...tasks[taskIndex], ...model };
                tasks[taskIndex] = updatedTask;
            }
        },
        setTasksAC: (state, action: PayloadAction<{ tasks: Array<TaskType>, todolistId: string }>) => {
            // логику в подредьюсерах пишем мутабельным образом,
            // т.к. иммутабельность достигается благодаря immer.js
            // const {id} = action.payload;
            // const index = state.findIndex(tl => tl.id === id);
            // if (index !== -1) {
            //     state[index].filter = action.payload.filter;
            // }
            const {tasks, todolistId } = action.payload;
            state[todolistId] = tasks;
        },
        // changeTodolistEntityStatusAC: (state, action: PayloadAction<{ id: string, status: RequestStatusType }>) => {
        //     // логику в подредьюсерах пишем мутабельным образом,
        //     // т.к. иммутабельность достигается благодаря immer.js
        //     const {id} = action.payload;
        //     const index = state.findIndex(tl => tl.id === id);
        //     if (index !== -1) {
        //         state[index].entityStatus = action.payload.status;
        //     }
        // },
        // setTodolistsAC: (state, action: PayloadAction<{ todolists: Array<TodolistType>}>) => {
        //     // логику в подредьюсерах пишем мутабельным образом,
        //     // т.к. иммутабельность достигается благодаря immer.js
        //     return action.payload.todolists.map((tl) => ({
        //         ...tl,
        //         filter: 'all',
        //         entityStatus: 'idle',
        //     }));
        //
        //     // action.payload.todolists.forEach((tl) => {
        //     //     state.push({
        //     //         ...tl,
        //     //         filter: 'all',
        //     //         entityStatus: 'idle',
        //     //     });
        //     // });
        // },
    },
});

// Создаем reducer с помощью slice
export const tasksReducer = slice.reducer;
// Action creator также достаем с помощью slice
export const {
    removeTaskAC,
    addTaskAC,
    updateTaskAC,
    setTasksAC,
} = slice.actions
// либо вот так. ❗Делаем так, в дальнейшем пригодиться
// export const authActions = slice.actions

export type TasksStateType = {
    [key: string]: Array<TaskType>
}