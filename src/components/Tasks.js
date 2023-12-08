import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Task from './Task';

const Tasks = ({ tasks, onDelete, onChange}) => {
    // console.log(tasks)
    
    return (
        <div className="todo-items">
            {tasks.map((task) =>(
                <Task key={task.id} task={task} onChange={onChange} onDelete={onDelete}/>
            ))}
            
        </div>
    )
}

export default Tasks
