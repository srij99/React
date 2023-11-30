import React from 'react';
import Functionalapp from './functions';
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import  Navbar  from './Navbar';
import './App.css'

export default function App() {
  return (
    <Router>
    <Navbar/>
      <Routes>
      
        <Route path="/" element={<Functionalapp />} />
      
      </Routes>
    </Router>
  
  );
}
