import { Link } from "react-router-dom"

export default function TaskCard(props) {

const {
    id,
    title,
    description,
    assignedTo,
    completed
} = props.task

  const handleDeleteTask= props.handleDeleteTask
  const handleCompleteTask= props.handleCompleteTask

  return (
    
    <tr key={id}>
        <td>{title}</td>
        <td>{description}</td>
        <td>{assignedTo.id ? 
          <span style={{color: 'orange'}}>{assignedTo.fullName}d</span> :
          <button>Assign task</button>
          }
        </td>
{/*         <td>{completed ? 
          <span style={{color: 'green'}}>Done</span> : 
          <span style={{color: 'red'}}>Not completed</span>}
        </td> */}
        <td>
            <Link to={`/editTask/${id}`}>Edit</Link>
            <button onClick={() => {handleDeleteTask(id)}}>Delete</button>
   {/*          {assignedTo.id && !completed ? 
              <button onClick={() => {handleCompleteTask(id)}}>Complete task</button> : null
            } */}
        </td>
    </tr>
  )
}
