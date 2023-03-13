import React from 'react'

import { useEffect, useState } from 'react';
import TaskList from './TaskList';
import EmpList from './EmpList';


function Dashboard() {

    const baseUrl = 'http://localhost:8000'

    const [empl, setEmpl] = useState(null)
    const [tasks, setTasks] = useState(null)

    function handleDeleteEmp(id) {

        fetch(baseUrl + `/employees/${id}`, {
            method: 'DELETE'
        }).then((res) => {
            const newList = empl.filter(e => e.id !== id)
            setEmpl(newList)
            alert('Deleted succesfully')
        }).catch((err) => {
            console.log(err);
        }) 
    }

    function handleDeleteTask(id) {

        fetch(baseUrl + `/tasks/${id}`, {
            method: 'DELETE'
        }).then((res) => {
            const newList = tasks.filter(t => t.id !== id)
            setTasks(newList)
            alert('Deleted succesfully')
        }).catch((err) => {
            console.log(err);
        }) 
    }

    const [taskDone, setTaskDone] = useState({})

/*     function handleCompleteTask(id) {
        


        setTaskDone(tasks.filter(t => t.id === id))
        setTaskDone(state => ({...state, completed: true}))
    
/*         fetch(baseUrl + `/tasks/${id}`, {
            method: 'PUT',
            headers: {"Content-type":"application/json"},
            body: JSON.stringify(taskDone)
        }).then((res) => {
            console.log(res);
            alert('Task completed succesfully')
        }).catch((err) => {
            console.log(err);
        })  
    }
     */
  
    useEffect(() => {
      fetch(baseUrl + '/employees')
      .then(res => res.json())
      .then(resp => setEmpl(resp))
      .catch(err => console.log(err))
    }, [])
  
    useEffect(() => {
      fetch(baseUrl + '/tasks')
      .then(res => res.json())
      .then(resp => setTasks(resp))
      .catch(err => console.log(err))
    }, [])

  return (
    <>
    <div className='dashboard-container'>
        <div className='employee-dashboard'>
            <EmpList empl={empl} handleDeleteEmp={handleDeleteEmp} />
        </div>
        <div className='tasks-dashboard'>
            <TaskList tasks={tasks} handleDeleteTask={handleDeleteTask}
            /* handleCompleteTask={handleCompleteTask} *//>
        </div>
    </div>
    </>
  )
}

export default Dashboard