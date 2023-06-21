import { configureStore } from '@reduxjs/toolkit'
import {authReducer} from "../features/auth/authSlice";
import {appReducer} from "./appSlice";
import {todolistsReducer} from "../features/TodolistsList/Todolist/TodolistSlice";
import {tasksReducer} from "../features/TodolistsList/Todolist/Task/tasksSlice";

export const store = configureStore({
    reducer: {
        app: appReducer,
        auth: authReducer,
        todolists: todolistsReducer,
        tasks: tasksReducer,
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootStateType = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// export type AppThunk<ReturnType = void> = ThunkAction<
//     ReturnType,
//     RootState,
//     unknown,
//     Action<string>
// >;