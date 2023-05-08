import React, {useState} from 'react';
import {filterType, TaskType} from "./App";

type PropsType = {
  title: string
  tasks: Array<TaskType>
}

export function Todolist(props: PropsType) {
  const [filterKey, setFilterKey] = useState<filterType>(filterType.All)
  const [tasks, setTasks] = useState<TaskType[]>(props.tasks)

  const removeTask = (taskId: number) => {
    const newTasks = tasks.filter(t => t.id !== taskId);
    console.log(tasks)
    console.log(newTasks)
    setTasks(newTasks);
  }

  const filterTasks = (status: filterType) => {
    if (status === 'Completed') {
      setFilterKey(filterType.Completed)
    } else if (status === 'Active') {
      setFilterKey(filterType.Active)
    } else {
      setFilterKey(filterType.All)
    }
  }

  const getFilteredTask = () => {
    let filteredTasks = tasks;
    if (filterKey === filterType.Completed) {
      filteredTasks = tasks.filter(t => t.isDone)
    } else if (filterKey === filterType.Active) {
      filteredTasks = tasks.filter(t => !t.isDone)
    }
    return filteredTasks
  }

  return <div>
    <h3>{props.title}</h3>
    <div>
      <input/>
      <button>+</button>
    </div>
    <ul>
      {getFilteredTask().map(el => <li key={el.id}>
        <button onClick={() => removeTask(el.id)}>X</button>
        <input type="checkbox" checked={el.isDone}/>
        <span>{el.title}</span>
      </li>)}
    </ul>
    <div>
      <button onClick={() => filterTasks(filterType.All)}>All</button>
      <button onClick={() => filterTasks(filterType.Active)}>Active</button>
      <button onClick={() => filterTasks(filterType.Completed)}>Completed</button>
    </div>
  </div>
}
