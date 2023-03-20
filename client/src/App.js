import './App.css';
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar.jsx';
import LandingPage from './Pages/Landing/Landing.jsx';
import Home from './Pages/Home/Home.jsx';
import Details from './Pages/Details/Details';
import CreateForm from './Pages/Create/CreateForm.jsx';

import './App.css'

function App() {
  let location = useLocation()
  return (
    <div className='mainContainer'>
      <div>{location.pathname !== '/' && <Navbar />}</div>
      <Routes>
        <Route exact path='/' element={<LandingPage />} />
        <Route exact path='/pokemons' element={<Home />} />
        <Route path='/pokemons/:id' element={<Details />} />
        <Route path='/create' element={<CreateForm />} />
      </Routes>
    </div>
  );
}
export default App;
