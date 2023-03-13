import React from 'react'
import { Link } from 'react-router-dom'
import TaskCard from './TaskCard'

export default function TaskList(props) {

    const taskList = props.tasks
    const handleDeleteTask= props.handleDeleteTask
    const handleCompleteTask= props.handleCompleteTask

  return (
    <div className='container'>
    <div className='card-title'>
        <h2>Tasks List</h2>
    </div>
    <div className='card-body'>
        <table className='content-table'>
            <thead>
                <tr>
                    <td>Title</td>
                    <td>Description</td>
                    <td>Assigned to</td>
                    <td>Actions</td>
                    {/* <td>Completed</td> */}
                </tr>
            </thead>
            <tbody>
                    {taskList ? 
                    taskList.map(t => <TaskCard key={t.id} task={t} 
                        handleDeleteTask={handleDeleteTask}
                        /* handleCompleteTask={handleCompleteTask} *//>) : 
                    <tr>
                        <td><p style={{color: 'red'}}>No Tasks at this time</p></td>
                    </tr>
                    }
            </tbody>
        </table>
        <Link to={'/createTask'}>Add new Task</Link>
    </div>
</div>
  )
}
