import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EmpEdit() {
    const baseUrl = 'http://localhost:8000'
    let { id } = useParams()
    const navigate = useNavigate()
    const [employee, setEmployee] = useState({})

    useEffect(() => {
        fetch(baseUrl + `/employees/${id}`)
        .then(res => res.json())
        .then(resp => setEmployee(resp))
        .catch(err => console.log(err))
      }, [])


    const [errors, setErrors] = useState({})
    const [initialCheck, setInitialCheck] = useState(true)

    const onChangeHandler = (e) => {
        setEmployee(state => ({...state, [e.target.name]: e.target.value}))
    }

    const createEmpHandler = (e) => {
        e.preventDefault()
        validate(employee)
        if (initialCheck) {
            setInitialCheck(false)      
        }
        if (initialCheck === false && validate(employee)) {  
            

            /*TODO FIX THE BUG WHERE YOU HAVE TO CLICK 2 TIMES TO EDIT/CREATE */
            fetch(baseUrl + `/employees/${id}`, {
                method: 'PUT',
                headers: {"Content-type":"application/json"},
                body: JSON.stringify(employee)
            }).then((res) => {
                console.log(res);
                alert('Edited succesfully')
                navigate('/')
            }).catch((err) => {
                console.log(err);
        })              
     }
    }

    /*TODO: abstact the validation function for create/edit */
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


  return (
    <div>
    <h1>Create new Employee Profile</h1>
    <form onSubmit={createEmpHandler} method='POST'>
        <div className='fullname-div'>
            <label htmlFor='fullName'>Full name:</label>
            <input type='text' name='fullName' 
            value={employee.fullName} 
            onChange={onChangeHandler}></input>
            { errors.fullName ? <p style={{color: 'red'}}>{errors.fullName}</p> : null}
        </div>
        <div className='email-div'>
            <label htmlFor='email'>Email:</label>
            <input type='email' name='email' 
            value={employee.email} 
            onChange={onChangeHandler}></input>
            {errors.email ? <p style={{color: 'red'}}>{errors.email}</p> : null}
        </div>
        <div className='phonenumber-div'>
            <label htmlFor='phoneNumber'>Phone Number:</label>
            <input type='number' name='phoneNumber' 
            value={employee.phoneNumber} 
            onChange={onChangeHandler}></input>
            {errors.phoneNumber ? <p style={{color: 'red'}}>{errors.phoneNumber}</p> : null}
        </div>
        <div className='birthday-div'>
            <label htmlFor='birthday'>Date of birth:</label>
            <input type='date' name='birthday' 
            value={employee.birthday} 
            onChange={onChangeHandler}></input>
            {errors.birthday ? <p style={{color: 'red'}}>{errors.birthday}</p> : null}
        </div>
        <div className='salary-div'>
            <label htmlFor='salary'>Monthly Salary:</label>
            <input type='number' name='salary' 
            value={employee.salary} 
            onChange={onChangeHandler}></input>
            {employee.salary < 100 ? <p style={{color: 'red'}}>{errors.salary}</p> : null}
        </div>
        <button type='submit'>Edit employee <i>TODO: fix bug, have to click 2 times</i></button>
    </form>
    
</div>
  )
}
