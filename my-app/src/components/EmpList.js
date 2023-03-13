import React from 'react'
import { Link } from 'react-router-dom'
import EmpCard from './EmpCard'

export default function EmpList(props) {

    const empList = props.empl
    const handleDeleteEmp = props.handleDeleteEmp

  return (
    <div className='container'>
        <div className='card-title'>
            <h2>All Employees</h2>
        </div>
        <div className='card-body'>
            <table className='content-table'>
                <thead>
                    <tr>
                        <td>Full Name</td>
                        <td>Email</td>
                        <td>Phone</td>
                        <td>Salary</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {empList ? 
                    empList.map(e => <EmpCard key={e.id} employees={e} handleDeleteEmp={handleDeleteEmp} />) : 
                    <tr>
                        <td><p style={{color: 'red'}}>No Employees at this time</p></td>
                    </tr>
                    }
                </tbody>
            </table>
            <Link to={'/createEmployee'}>Add new Employee</Link>
        </div>
    </div>
  )
}
