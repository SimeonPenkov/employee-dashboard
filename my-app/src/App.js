
import './App.css';
import {Route, Routes} from 'react-router-dom'
import Dashboard from './components/Dashboard';
import EmpCreate from './components/EmpCreate';
import EmpEdit from './components/EmpEdit';
import TaskCreate from './components/TaskCreate';
import TaskEdit from './components/TaskEdit';

function App() {


  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Dashboard/>}></Route>
        <Route path='/createTask' element={<TaskCreate/>}></Route>
        <Route path='/editTask/:id' element={<TaskEdit/>}></Route>
        <Route path='/createEmployee' element={<EmpCreate/>}></Route>
        <Route path='/editEmployee/:id' element={<EmpEdit/>}></Route>
        <Route path='/assignTaskTo/:id' element={<Dashboard/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
