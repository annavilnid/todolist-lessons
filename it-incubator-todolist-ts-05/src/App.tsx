import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksType = {
    [todolistID: string] : TaskType[]
}

function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })
    // let [todolists, setTodolists] = useState<todolistsType>([
    //       {id: v1(), title: 'What to learn', filter: 'active'},
    //       {id: v1(), title: 'What to buy', filter: 'all'},
    // ])
    //
    // let [tasks, setTasks] = useState([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Rest API", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false},
    // ]);

    // let [filter, setFilter] = useState<FilterValuesType>("all");

    function removeTask(todolistID: string, taskID: string) {
        let filteredTasks = {...tasks, [todolistID]: tasks[todolistID].filter(t => t.id != taskID)};
        setTasks(filteredTasks);
    }

    function addTask(todolistID: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistID]: [...tasks[todolistID], newTask]});
        // let task = {id: v1(), title: title, isDone: false};
        // let newTasks = [task, ...tasks];
        // setTasks(newTasks);
    }

    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskId ? {...t, isDone}: t)});
        // let task = tasks.find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone;
        // }
        //
        // setTasks([...tasks]);
    }


    // let tasksForTodolist = tasks;
    //
    // if (filter === "active") {
    //     tasksForTodolist = tasks.filter(t => t.isDone === false);
    // }
    // if (filter === "completed") {
    //     tasksForTodolist = tasks.filter(t => t.isDone === true);
    // }

    function changeFilter(todolistID: string, value: FilterValuesType) {
        setTodolists(todolists.map(t => t.id === todolistID ? {...t, filter: value}: t))
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(t => t.id !==todolistId))
        delete tasks[todolistId]
        // let newTasks = {...tasks};
        // delete newTasks[todolistId];
        // setTasks(newTasks)

        // delete newTasks[todolistId]
        // setTodolists(newTasks)
    }

    return (
      <div className="App">
          {todolists.map(el => {
              let tasksForTodolist = tasks[el.id];

              if (el.filter === "active") {
                  tasksForTodolist = tasks[el.id].filter(t => t.isDone === false);
              }
              if (el.filter === "completed") {
                  tasksForTodolist = tasks[el.id].filter(t => t.isDone === true);
              }

              return (<Todolist key={el.id}
                                todolistID={el.id}
                                title={el.title}
                                tasks={tasksForTodolist}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                filter={el.filter}
                                removeTodolist={removeTodolist}/>
              )
          })}
      </div>
    );
}

export default App;
