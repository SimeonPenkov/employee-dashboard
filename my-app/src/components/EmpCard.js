import React from 'react'
import { Link } from 'react-router-dom'

export default function EmpCard(props) {

const {
    id,
    fullName,
    email,
    phoneNumber,
    birthday,
    salary,
    tasks
} = props.employees

const handleDeleteEmp = props.handleDeleteEmp

  return (
    
    <tr key={id}>
        <td>{fullName}</td>
        <td>{email}</td>
        <td>{phoneNumber}</td>
        <td>{salary}</td>
        <td>
            <Link to={`/editEmployee/${id}`}>Edit</Link>
            <button onClick={() => handleDeleteEmp(id)}>Delete</button>
            {tasks.length > 0 ?             
            <select>
                {tasks.map(t => <option key={t.id}>{t.title}</option>)}
            </select> : null
            }

        </td>
    </tr>
  )
}
