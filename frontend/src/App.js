import "./App.css";
import Navbar from "./components/navbar/Navbar.js";
import { Outlet, useLocation } from "react-router-dom";
import Login from './components/loginPage/Login.js'
import { useState } from 'react';


function App() {

  const [user, setUser] = useState();

  return (
    <div className="background--custom">
      <div className="App">
        <Navbar />
        <Outlet />
        {useLocation().pathname === "/" && <Login/>} 
      </div>
    </div>
  );
}

export default App;
