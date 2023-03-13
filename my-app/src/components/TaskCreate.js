import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TaskCreate() {

    const baseUrl = 'http://localhost:8000'
    const navigate = useNavigate()
    const [error, setError] = useState(true)
    const [initialSubmit, setInitialSubmit] = useState(true)
    const [values, setValues] = useState({
        title: '',
        description: '',
        assignedTo: {},
        completed: false
    })


    const onChangeHandler = (e) => {
        setValues(state => ({...state, [e.target.name]: e.target.value}))
        setInitialSubmit(false)
        if (values.title.length < 10 || values.description.length < 10) {
            setError(true)
        }else{
            setError(false)
        }
    }

    const createTaskHandler = (e) => {
        e.preventDefault()
        setInitialSubmit(false)
        if (!error && !initialSubmit) {
            fetch(baseUrl + '/tasks', {
                method: 'POST',
                headers: {"Content-type":"application/json"},
                body: JSON.stringify(values)
            }).then((res) => {
                console.log(res);
                alert('Saved succesfully')
                navigate('/')
            }).catch((err) => {
                console.log(err);
            }) 
        }
    }
  return (
    <div>
        <h2>Add new Task</h2>
        <form onSubmit={createTaskHandler} method='POST'>
        <div className='title-div'>
            <label htmlFor='title'>Task Title:</label>
            <input type='text' name='title' 
            value={values.title} 
            onChange={onChangeHandler}></input>
        </div>
        <div className='description-div'>
            <label htmlFor='description'>Description:</label>
            <input type='text' name='description' 
            value={values.description} 
            onChange={onChangeHandler}></input>
        </div>
        {error && !initialSubmit ? <p style={{color: 'red'}}>Please fill in the fields with at least 10 symbols</p> : null}
        <button type='submit'>Add Task<i>TODO: fix bug, have to click 2 times</i></button>
    </form>
    </div>
  )
}

export default TaskCreate