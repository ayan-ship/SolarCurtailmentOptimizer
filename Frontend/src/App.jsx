import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './page/Login';
import Dashboard from './page/Dashboard';
import HomePage from './page/HomePage';
import Insights from './page/Insights';
import About from './page/About';
import Protected from './protection/Protected';
import Navbar from './compo/Navbar';

const App = () => {



 

  return (
    <div className='w-full min-h-screen box-border bg-[#09090b] text-white overflow-auto scrollbar-hide'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />
          <Route path='/insights' element={<Insights />} />
          <Route path='/' element={<HomePage />}    />
        </Routes>
      </Router>

    </div>
  )
}



export default App
