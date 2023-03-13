import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import uniqid from 'uniqid';

export default function EmpCreate() {
    const baseUrl = 'http://localhost:8000'

    const [errors, setErrors] = useState({})
    const [initialCheck, setInitialCheck] = useState(true)

    const navigate = useNavigate()

    const [values, setValues] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        birthday: '',
        salary: '',
        tasks:[]
    })

    

   function validate(values) {
    const currentErrors = {
        fullName: 'Please enter a valid full name between 3 and 16 symbols, please use first and last name',
        email: 'Please enter a valid Email',
        phoneNumber: 'Please enter a valid Phone Number',
        birthday: 'Employee must be over 16',
        salary: 'Salary cannot be less than 100$'
    }

    const currYear = new Date().getFullYear()

     if(!(/(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/
     .test(values.fullName) === false || values.fullName === ''))
     {
        currentErrors.fullName = null
     }

     if(!(values.email === ''))
     {
        currentErrors.email = null
     }


    if(!(values.phoneNumber === ''))
     {
        currentErrors.phoneNumber = null
     }
     if(!((currYear - Number(values.birthday.split('-')[0])) < 16 || values.birthday === '')){
        currentErrors.birthday = null
     }

     if(!(values.salary < 100 )){
        currentErrors.salary = null
     }

     setErrors(currentErrors)

      const errorsNumber = Object.values(errors).filter(e => e !== null).length;
     if (errorsNumber === 0) {
        return true
     }else{
        return false
     } 
     
   }

    const onChangeHandler = (e) => {
        setValues(state => ({...state, [e.target.name]: e.target.value}))
    }

    const createEmpHandler = (e) => {
        e.preventDefault()
        validate(values)
     if (initialCheck) {
        setInitialCheck(false)      
     }
     if (initialCheck === false && validate(values)) {    

        
        fetch(baseUrl + '/employees', {
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
    <h1>Create new Employee Profile</h1>
    <form onSubmit={createEmpHandler} method='POST'>
        <div className='fullname-div'>
            <label htmlFor='fullName'>Full name:</label>
            <input type='text' name='fullName' 
            value={values.fullName} 
            onChange={onChangeHandler}></input>
            {errors.fullName ? <p style={{color: 'red'}}>{errors.fullName}</p> : null}
        </div>
        <div className='email-div'>
            <label htmlFor='email'>Email:</label>
            <input type='email' name='email' 
            value={values.email} 
            onChange={onChangeHandler}></input>
            {errors.email ? <p style={{color: 'red'}}>{errors.email}</p> : null}
        </div>
        <div className='phonenumber-div'>
            <label htmlFor='phoneNumber'>Phone Number:</label>
            <input type='number' name='phoneNumber' 
            value={values.phoneNumber} 
            onChange={onChangeHandler}></input>
            {errors.phoneNumber ? <p style={{color: 'red'}}>{errors.phoneNumber}</p> : null}
        </div>
        <div className='birthday-div'>
            <label htmlFor='birthday'>Date of birth:</label>
            <input type='date' name='birthday' 
            value={values.birthday} 
            onChange={onChangeHandler}></input>
            {errors.birthday ? <p style={{color: 'red'}}>{errors.birthday}</p> : null}
        </div>
        <div className='salary-div'>
            <label htmlFor='salary'>Monthly Salary:</label>
            <input type='number' name='salary' 
            value={values.salary} 
            onChange={onChangeHandler}></input>
            {errors.salary ? <p style={{color: 'red'}}>{errors.salary}</p> : null}
        </div>
        <button type='submit'>Add employee<i>TODO: fix bug, have to click 2 times</i></button>
    </form>
    
</div>
  )
}
