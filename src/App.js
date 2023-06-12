import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import Registration from './Components/Registration';
import {Routes , Route } from "react-router-dom" 

import Dashboard from './Components/Dashboard';
import NoMatch from './Components/NoMatch';
import Cart from './Components/Cart';

function App() {
  return (
    <div className="App">
      <Routes> 
        
            <Route path="/login" element={<Login/> } /> 
            <Route path="/registration" element={<Registration/> } /> 
            <Route path="/dashboard" element={<Dashboard/> } /> 
            <Route path="/cart" element={<Cart/> } /> 
            <Route path="*" element={<Login/>} />
       </Routes> 
    </div>
  );
}

export default App;
