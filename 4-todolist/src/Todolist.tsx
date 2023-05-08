import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import './App.css';
import s from './Todolist.module.css'
import {SuperCheckBox} from "./components/SuperCheckBox";

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
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, status: boolean) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {
    let [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null);

    const addTask = () => {
        if (title.trim()) {
            props.addTask(title.trim());
            setTitle("");
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");

    const CheckBoxHandler = (id: string, newIsDone: any) => props.changeTaskStatus(id, newIsDone)

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   className={error ? 'error' : ''}
                   onChange={ onChangeHandler }
                   onKeyPress={ onKeyPressHandler }
            />
            <button onClick={addTask}>+</button>
            {error && <p className='error-message'>{error}</p>}
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)

                    return <li key={t.id} className={t.isDone? s.is_done : ''}>
                        <SuperCheckBox checked={t.isDone}
                                       callback={(newIsDone: boolean) => CheckBoxHandler(t.id, newIsDone)}/>
                                       {/*callback={(e: React.ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked)}/>*/}
                        {/*<input type="checkbox" onChange={(e) => {*/}
                        {/*    console.log(e)*/}
                        {/*    props.changeTaskStatus(t.id, e.currentTarget.checked)*/}
                        {/*   }*/}
                        {/*} checked={t.isDone}/>*/}
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? s.active_filter : ''} onClick={ onAllClickHandler }>All</button>
            <button className={props.filter === 'active' ? s.active_filter : ''} onClick={ onActiveClickHandler }>Active</button>
            <button className={props.filter === 'completed' ? s.active_filter : ''} onClick={ onCompletedClickHandler }>Completed</button>
        </div>
    </div>
}
