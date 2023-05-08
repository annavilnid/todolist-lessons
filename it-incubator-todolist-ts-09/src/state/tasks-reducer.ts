import {FilterValuesType, TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";
import {inputClasses} from "@mui/material";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>

export type AddTaskActionType = ReturnType<typeof addTaskAC>

export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>

export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType;

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType  => {
  switch (action.type) {
    case 'REMOVE-TASK':
      return {...state, [action.payload.todolistID]: state[action.payload.todolistID].filter(task => task.id !== action.payload.taskID)}
    case 'REMOVE-TODOLIST':
      delete state.id
      return state
    case 'ADD-TODOLIST':
      return {
        ...state,
        [action.todolistID]: []
      }
    case 'ADD-TASK':
      return {
        ...state,
        [action.payload.todolistID]: [{id: v1(), title: action.payload.title, isDone: false},
          ...state[action.payload.todolistID]]
      }
    case 'CHANGE-TASK-STATUS':
      return {
        ...state,
        [action.payload.todolistID]: state[action.payload.todolistID]
          .map(task => task.id === action.payload.taskID ? {...task, isDone: action.payload.taskStatus} : task)
      }
    case 'CHANGE-TASK-TITLE':
      return {
        ...state,
        [action.payload.todolistID]: state[action.payload.todolistID]
          .map(task => task.id === action.payload.taskID ? {...task, title: action.payload.title} : task)
      }
    default:
      return state
      throw new Error("I don't understand this type")
  }
}

export const removeTaskAC = (todolistID: string, taskID: string) => {
  return {
    type: 'REMOVE-TASK' as const,
    payload: {
      todolistID,
      taskID,
    },
  }
}

export const addTaskAC = (title: string, todolistID: string) => {
  return {
    type: 'ADD-TASK' as const,
    payload: {
      todolistID,
      title,
    },
  }
}

export const changeTaskStatusAC = (taskID: string, taskStatus: boolean, todolistID: string) => {
  return {
    type: 'CHANGE-TASK-STATUS' as const,
    payload: {
      taskID,
      todolistID,
      taskStatus
    },
  }
}

export const changeTaskTitleAC = (taskID: string, title: string, todolistID: string) => {
  return {
    type: 'CHANGE-TASK-TITLE' as const,
    payload: {
      taskID,
      todolistID,
      title
    },
  }
}

