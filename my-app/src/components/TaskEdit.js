import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function TaskEdit() {


    let { id } = useParams()
    const baseUrl = 'http://localhost:8000'
    const navigate = useNavigate()
    const [error, setError] = useState(true)
    const [initialSubmit, setInitialSubmit] = useState(true)
    const [task, setTask] = useState({})

    useEffect(() => {
        fetch(baseUrl + `/tasks/${id}`)
        .then(res => res.json())
        .then(resp => setTask(resp))
        .catch(err => console.log(err))
      }, [])


    const onChangeHandler = (e) => {
        setTask(state => ({...state, [e.target.name]: e.target.value}))
        setInitialSubmit(false)
        if (task.title.length < 10 || task.description.length < 10) {
            setError(true)
        }else{
            setError(false)
        }
    }

    const createTaskHandler = (e) => {
        e.preventDefault()
        setInitialSubmit(false)
        if (!error && !initialSubmit) {
            fetch(baseUrl + `/tasks/${id}`, {
                method: 'PUT',
                headers: {"Content-type":"application/json"},
                body: JSON.stringify(task)
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
            value={task.title} 
            onChange={onChangeHandler}></input>
        </div>
        <div className='description-div'>
            <label htmlFor='description'>Description:</label>
            <input type='text' name='description' 
            value={task.description} 
            onChange={onChangeHandler}></input>
        </div>
        {error && !initialSubmit ? <p style={{color: 'red'}}>Please fill in the fields with at least 10 symbols</p> : null}
        <button type='submit'>Add Task<i>TODO: fix bug, have to click 2 times</i></button>
    </form>
    </div>
  )
}

export default TaskEdit