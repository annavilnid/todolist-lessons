import {TasksStateType, TodolistType} from '../App'
import {v1} from "uuid";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {AddTodolistAC, RemoveTodolistAC, todolistsReducer} from "./todolists-reducer";

test('correct task should be deleted from correct array', () => {
  const startState: TasksStateType = {
    "todoListID1": [
      {id: "1", title: "HTML&CSS", isDone: true},
      {id: "2", title: "JS", isDone: true},
      {id: "3", title: "ReactJS", isDone: false},
    ],
    "todoListID2": [
      {id: "1", title: "Rest API", isDone: false},
      {id: "2", title: "GraphQL", isDone: false},
      {id: "3", title: "API", isDone: false},
    ]
  }

  const action = removeTaskAC("todoListID2", "2")

  const endState = tasksReducer(startState, action)

  expect(endState).toEqual({
    "todoListID1": [
      {id: "1", title: "HTML&CSS", isDone: true},
      {id: "2", title: "JS", isDone: true},
      {id: "3", title: "ReactJS", isDone: false},
    ],
    "todoListID2": [
      {id: "1", title: "Rest API", isDone: false},
      {id: "3", title: "API", isDone: false},
    ]
  })

})

test('correct task should be added to correct array', () => {
  const startState: TasksStateType = {
    'todolistId1': [
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false}
    ],
    'todolistId2': [
      {id: '1', title: 'bread', isDone: false},
      {id: '2', title: 'milk', isDone: true},
      {id: '3', title: 'tea', isDone: false}
    ]
  }

  const action = addTaskAC('juce', 'todolistId2')

  const endState = tasksReducer(startState, action)

  expect(endState['todolistId1'].length).toBe(3)
  expect(endState['todolistId2'].length).toBe(4)
  expect(endState['todolistId2'][0].id).toBeDefined()
  expect(endState['todolistId2'][0].title).toBe('juce')
  expect(endState['todolistId2'][0].isDone).toBe(false)
  expect(endState['todolistId2'][0].id).toBe('4')
})

test('status of specified task should be changed', () => {
  const startState: TasksStateType = {
    'todolistId1': [
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false}
    ],
    'todolistId2': [
      {id: '1', title: 'bread', isDone: false},
      {id: '2', title: 'milk', isDone: true},
      {id: '3', title: 'tea', isDone: false}
    ]
  }

  const action = changeTaskStatusAC('2', false, 'todolistId2')

  const endState = tasksReducer(startState, action)

  expect(endState['todolistId1'][1].isDone).toBe(true)
  expect(endState['todolistId2'][1].isDone).toBe(false)
})

test('title of specified task should be changed', () => {
  const startState: TasksStateType = {
    'todolistId1': [
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false}
    ],
    'todolistId2': [
      {id: '1', title: 'bread', isDone: false},
      {id: '2', title: 'milk', isDone: true},
      {id: '3', title: 'tea', isDone: false}
    ]
  }

  const action = changeTaskTitleAC('2', 'water', 'todolistId2')

  const endState = tasksReducer(startState, action)

  expect(endState['todolistId1'][1].title).toBe('JS')
  expect(endState['todolistId2'][1].title).toBe('water')
})

test('new array should be added when new todolist is added', () => {
  const startState: TasksStateType = {
    'todolistId1': [
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false}
    ],
    'todolistId2': [
      {id: '1', title: 'bread', isDone: false},
      {id: '2', title: 'milk', isDone: true},
      {id: '3', title: 'tea', isDone: false}
    ]
  }

  const action = AddTodolistAC('new todolist')

  const endState = tasksReducer(startState, action)


  const keys = Object.keys(endState)
  const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
  if (!newKey) {
    throw Error('new key should be added')
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test('ids should be equals', () => {
  const startTasksState: TasksStateType = {}
  const startTodolistsState: Array<TodolistType> = []

  const action = AddTodolistAC('new todolist')

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.todolistID)
  expect(idFromTodolists).toBe(action.todolistID)
})

test('property with todolistId should be deleted', () => {
  const startState: TasksStateType = {
    'todolistId1': [
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false}
    ],
    'todolistId2': [
      {id: '1', title: 'bread', isDone: false},
      {id: '2', title: 'milk', isDone: true},
      {id: '3', title: 'tea', isDone: false}
    ]
  }

  const action = RemoveTodolistAC('todolistId2')

  const endState = tasksReducer(startState, action)


  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState['todolistId2']).not.toBeDefined()
})