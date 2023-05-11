import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";
import {Button, Checkbox} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TasksStateType, TodolistType} from "./AppWithReducers";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolists-reducer";


export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  // id: string
  // title: string
  tasks: TasksStateType
  // removeTask: (taskId: string, todolistId: string) => void
  // changeFilter: (value: FilterValuesType, todolistId: string) => void
  // addTask: (title: string, todolistId: string) => void
  // changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
  // removeTodolist: (id: string) => void
  // changeTodolistTitle: (id: string, newTitle: string) => void
  // filter: FilterValuesType
  // changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export function TodolistWithRedux(props: PropsType) {
  const todo = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
  const dispatch = useDispatch();

  function addTask(title: string, todolistId: string) {
    dispatch(addTaskAC(title, todolistId))
  }

  function removeTodolist(id: string) {
    let action = removeTodolistAC(id)
    dispatch(action)
  }

  function changeTodolistTitle(id: string, title: string) {
    dispatch(changeTodolistTitleAC(id, title))
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    dispatch(changeTodolistFilterAC(todolistId, value))
  }

  function removeTask(id: string, todolistId: string) {
    dispatch(removeTaskAC(id, todolistId))
  }

  function changeTaskStatus(id: string, isDone: boolean, todolistId: string) {
    dispatch(changeTaskStatusAC(id, isDone, todolistId))
  }

  function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
    dispatch(changeTaskTitleAC(id, newTitle, todolistId))
  }

  const onAllClickHandler = (id: string) => changeFilter("all", id);
  const onActiveClickHandler = (id: string) => changeFilter("active", id);
  const onCompletedClickHandler = (id: string) => changeFilter("completed", id);

    return (
      <>
        {todo.map(tl => {
          console.log(todo)
          console.log(tl)

        // let allTodolistTasks = props.tasks[tl.id];
        // let tasksForTodolist = allTodolistTasks;
        //
        // if (tl.filter === "active") {
        // tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
        // }
        // if (tl.filter === "completed") {
        // tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
        // }
        return <div key={tl.id}>{tl.title}</div>
          // <div key={tl.id}>
          //   <h3> <EditableSpan value={tl.title} onChange={(title: string)=>changeTodolistTitle(tl.id, title)} />
          //     <IconButton onClick={()=>removeTodolist(tl.id)}>
          //       <Delete />
          //     </IconButton>
          //   </h3>
          //   <AddItemForm addItem={(title: string)=>addTask(title, tl.id)}/>
          //   <div>
          //     {
          //       tasksForTodolist.map(t => {
          //         const onClickHandler = () => removeTask(t.id, tl.id)
          //         const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
          //           let newIsDoneValue = e.currentTarget.checked;
          //           changeTaskStatus(t.id, newIsDoneValue, tl.id);
          //         }
          //         const onTitleChangeHandler = (newValue: string) => {
          //           changeTaskTitle(t.id, newValue, tl.id);
          //         }
          //
          //
          //         return <div key={t.id} className={t.isDone ? "is-done" : ""}>
          //           <Checkbox
          //             checked={t.isDone}
          //             color="primary"
          //             onChange={onChangeHandler}
          //           />
          //
          //           <EditableSpan value={t.title} onChange={onTitleChangeHandler} />
          //           <IconButton onClick={onClickHandler}>
          //             <Delete />
          //           </IconButton>
          //         </div>
          //       })
          //     }
          //   </div>
          //   <div>
          //     <Button variant={tl.filter === 'all' ? 'outlined' : 'text'}
          //             onClick={()=>onAllClickHandler(tl.id)}
          //             color={'inherit'}
          //     >All
          //     </Button>
          //     <Button variant={tl.filter === 'active' ? 'outlined' : 'text'}
          //             onClick={()=>onActiveClickHandler(tl.id)}
          //             color={'primary'}>Active
          //     </Button>
          //     <Button variant={tl.filter === 'completed' ? 'outlined' : 'text'}
          //             onClick={()=>onCompletedClickHandler(tl.id)}
          //             color={'secondary'}>Completed
          //     </Button>
          //   </div>
          // </div>
        })}
      </>
    )
}