import {TodolistType} from "../App";
import {v1} from "uuid";

type ActionType = RemoveTodolistType
  | ChangeTitleType
  | AddTodolistType
  | ChangeFilterType

export const todolistsReducer = (state: TodolistType[], action: ActionType) => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter( t => t.id !== action.payload.id)
    case 'ADD-TODOLIST':
      return [...state,{id: v1(), title: action.payload.title, filter: 'all'}]
    case 'CHANGE-TODOLIST-TITLE':
      return state.map( t => t.id == action.payload.id ? {...t, title: action.payload.title} : t)
    case 'CHANGE-TODOLIST-FILTER':
      return state.map( t => t.id == action.payload.id ? {...t, filter: action.payload.newFilter} : t)
    default:
      throw new Error('I don\'t understand this type')
  }
}

type RemoveTodolistType = ReturnType<typeof removeTodolistAC>
type ChangeTitleType = ReturnType<typeof changeTitleAC>
type AddTodolistType = ReturnType<typeof addTodolistAC>
type ChangeFilterType = ReturnType<typeof changeFilterAC>

export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST' as const, payload:{id}})
export const addTodolistAC = (title: string) => ({type: 'ADD-TODOLIST' as const, payload:{title}})
export const changeTitleAC = (id: string, title: string) => ({type: 'CHANGE-TODOLIST-TITLE' as const, payload: {id, title}})
export const changeFilterAC = (id: string, newFilter: string) => ({type: 'CHANGE-TODOLIST-FILTER' as const, payload: {id, newFilter}})
