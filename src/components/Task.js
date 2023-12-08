import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const Task = ({task, onDelete, onChange}) => {

const [change, setChange] = useState(false)

useEffect(() => {
  const fetchInitialData = async () => {
    const result = await fetchTask(task.id);
    setChange(result.finished);
  };

  fetchInitialData();
}, [task.id]);

const fetchTask = async (id) => {
  const res = await fetch(`http://Localhost:5000/tasks/${id}`)
  const data = await res.json()

  return data;
}


const fetchTaskId = async (id) => {
  const result = await fetchTask(id)
  setChange(result.finished)
  console.log('before anything', change)
  if (result.finished === true) {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify({'text': result.text, 'finished' : !result.finished})
    })
    const output = await res.json()
    setChange(output.finished)
    console.log('after true conditionals', change, output.finished)
  } else {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify({'text': result.text, 'finished' : !result.finished})
    })
    const output = await res.json()
    setChange(output.finished)
    console.log('after false conditionals', change, output.finished)
  }
}

  return (
    <div className='item d-flex'>
        <div className='details d-flex'>
            <input className='checkbox' checked={change} type='checkbox' onChange={()=> (fetchTaskId(task.id)) } />
            <p className={`list-item ${change ? 'check' : ''}`}>{task.text}</p>
        </div>
        <div className='optionIcons'>
            <span className='fa fa-pen text-danger pen'></span>
            <FaTimes className='fa fa-trash text-danger trash' onClick={() => onDelete(task.id)} />
        </div>
    </div>
  )
}

export default Task
