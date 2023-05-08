import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export enum filterType {
    All = 'All',
    Completed = 'Completed',
    Active = 'Active',
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

function App() {

    const initialTasks = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ]

    return (
      <div className="App">
          <Todolist title="What to learn"
                    tasks={initialTasks}
          />
      </div>
    );
}

export default App;
