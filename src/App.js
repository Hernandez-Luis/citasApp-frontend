import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Citas from './pages/Citas';
import Login from './pages/Login';
import Clinicas from './pages/Clinicas';

import DetalleCita from './components/DetalleCita';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/citas" element={<Citas />} />
        <Route path="/citas/:id" element={<DetalleCita />} />
        <Route path="/clinicas" element={<Clinicas />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
