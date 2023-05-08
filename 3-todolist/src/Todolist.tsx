import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (taskTitle: string) => void
}

export function Todolist(props: PropsType) {
    const [taskTitle, setTaskTitle] = useState<string>("")

    const addTaskHandler = () => {
        props.addTask(taskTitle);
        setTaskTitle('');
    }

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value);
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler();
        }
    }

    const filterHandler = (filterName: FilterValuesType) => {
        props.changeFilter(filterName)
    }

    const buttonHandler = (id: string) => props.removeTask(id);

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={taskTitle}
                   onKeyDown={onKeyDownHandler}
                   onChange={onChangeInputHandler}/>
            <Button onClickHandler={addTaskHandler} name={'+'}/>
            {/*<button onClick={addTaskHandler}>+</button>*/}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <Button onClickHandler={() => buttonHandler(t.id)} name={'x'}/>
                        {/*<button onClick={()=>buttonHandler(t.id)}>x</button>*/}
                    </li>
                })
            }
        </ul>
        <div>
            <Button onClickHandler={() => filterHandler('All')} name={'All'}/>
            <Button onClickHandler={() => filterHandler('Active')} name={'Active'}/>
            <Button onClickHandler={() => filterHandler('Completed')} name={'Completed'}/>
        </div>
    </div>
}
