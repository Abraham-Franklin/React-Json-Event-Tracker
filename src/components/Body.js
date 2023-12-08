import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import Header from './Header';
import Tasks from './Tasks';

const Body = () => {
    const [tasks, setTasks] = useState([])
    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks()
            setTasks(tasksFromServer)
        }
        getTasks()
    }, [])

    //fetchTask
    const fetchTasks = async () => {
        const res = await fetch('http://localhost:5000/tasks')
        const data = await res.json()

        return data
    }


    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`)
        const data = await res.json()

        return data
    }

    const addTask = async ( taskText ) =>{
        const res = await fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(taskText),
        })
        const data = await res.json();
        setTasks([...tasks, data])
        console.log(data)
    }

    const deleteTask = async (id) => {
        await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'DELETE',
        })
        
        setTasks(tasks.filter((task) => task.id !== id))
    }

    const getId = async (id) =>{
        console.log(id, 'gotten')
        const finishedTask = await fetchTask(id)
        const updateTask = {...finishedTask, finished: !finishedTask.finished}
        const res = await fetch(`http://localhost:5000/tasks/${id}`,{
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(updateTask)
        })
        const data = await res.json()
        
        setTasks(
            tasks.map((task) => (
                task.id === id ? {...task, finished: !data.finished} : task
            ))
        )
    }

    return (
        <div className='body'>
            <div className="header bg-danger">
                <p className="siteName h1 text-white text-center">Todo List</p>
            </div>
            <div className="todoBody">
                <Header transferValue={addTask} />
                <br />
                <Tasks tasks={tasks} onChange={getId} onDelete={deleteTask}/>
            </div>
        </div>
    )
}

export default Body