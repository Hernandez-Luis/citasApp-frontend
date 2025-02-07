import React,{ useState }  from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Citas from './pages/Citas';
import Login from './pages/Login';
import Clinicas from './pages/Clinicas';
import DetalleCita from './components/DetalleCita';
import '../src/components/paciente/Paciente.css'; 
import PacienteList from "./components/paciente/PacienteList";
import Paciente from "./pages/Paciente";
 


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
        <Route path="/pacientes" element={<PacienteList/>} />
        <Route path="/pacientes/nuevo" element={<Paciente />} />
        <Route path="/pacientes/:id" element={<Paciente />} />
      </Routes>
    </Router>
  );
};

export default App;
