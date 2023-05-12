import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";
import {Button, Checkbox} from "@mui/material";
import {TasksStateType, TodolistType} from "./AppWithReducers";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  ActionsTasksType
} from "./state/tasks-reducer";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskType} from "./Todolist";


type PropsType = {
  todolist: TodolistType
}

export function TodolistWithRedux({todolist}: PropsType) {

  const {id, title, filter} = todolist;
  const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id])
  const dispatch = useDispatch();

  let allTodolistTasks = tasks;
      let tasksForTodolist = allTodolistTasks;

      if (filter === "active") {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
      }
      if (filter === "completed") {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
      }


  function addTask(title: string) {
    dispatch(addTaskAC(title, id))
  }

  function removeTodolist() {
    let action = removeTodolistAC(id)
    dispatch(action)
  }

  function removeTask(taskId: string) {
    dispatch(removeTaskAC(taskId, id))
  }

  function changeStatus(taskId: string, isDone: boolean) {
        console.log(taskId)
        console.log(isDone)
    dispatch(changeTaskStatusAC(taskId, isDone, id))
  }

  function changeTaskTitle(taskId: string, newTitle: string) {
    dispatch(changeTaskTitleAC(taskId, newTitle, id))
  }


  function changeFilter(value: FilterValuesType) {
    dispatch(changeTodolistFilterAC(id, value))
  }


  function changeTodolistTitle(title: string) {
    dispatch(changeTodolistTitleAC(id, title))
  }

  const onAllClickHandler = () => changeFilter("all");
  const onActiveClickHandler = () => changeFilter("active");
  const onCompletedClickHandler = () => changeFilter("completed");

  return <div>
    <h3> <EditableSpan value={title} onChange={changeTodolistTitle} />
      <IconButton onClick={removeTodolist}>
        <Delete />
      </IconButton>
    </h3>
    <AddItemForm addItem={addTask}/>
    <div>
      {
        tasksForTodolist.map(t => {
          const onClickHandler = () => removeTask(t.id)
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            changeStatus(t.id, newIsDoneValue);
          }
          const onTitleChangeHandler = (newValue: string) => {
            changeTaskTitle(t.id, newValue);
          }

          {console.log(t.isDone)}
          return <div key={t.id} className={t.isDone ? "is-done" : ""}>
            <Checkbox
              checked={t.isDone}
              color="primary"
              onChange={onChangeHandler}
            />

            <EditableSpan value={t.title} onChange={onTitleChangeHandler} />
            <IconButton onClick={onClickHandler}>
              <Delete />
            </IconButton>
          </div>
        })
      }
    </div>
    <div>
      <Button variant={filter === 'all' ? 'outlined' : 'text'}
              onClick={onAllClickHandler}
              color={'inherit'}
      >All
      </Button>
      <Button variant={filter === 'active' ? 'outlined' : 'text'}
              onClick={onActiveClickHandler}
              color={'primary'}>Active
      </Button>
      <Button variant={filter === 'completed' ? 'outlined' : 'text'}
              onClick={onCompletedClickHandler}
              color={'secondary'}>Completed
      </Button>
    </div>
  </div>
}