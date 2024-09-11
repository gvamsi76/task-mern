import './App.css';
import CustomerAdd from './components/Customer/CustomerAdd';
import CustomersList from './components/Customer/CustomerList';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
       <Routes>
        <Route path="/"  element ={<CustomersList />}/> 
        <Route path="/customer/:id?"  element ={<CustomerAdd />}/> 
      </Routes>
      
    </div>
  );
}

export default App;
