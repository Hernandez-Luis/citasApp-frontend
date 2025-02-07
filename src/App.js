import React,{ useState }  from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Citas from './pages/Citas';
import Login from './pages/Login';
import ClinicasList from '../src/components/clinica/ClinicaList';
import DetalleCita from './components/DetalleCita';
import '../src/components/paciente/Paciente.css'; 
import PacienteList from "./components/paciente/PacienteList";
import Paciente from "./pages/Paciente";
import ClinicaPage from './pages/ClinicaPage';


 import EspecialidadForm from './components/Especialidad/EspecialidadForm';
import DoctorForm from './components/DoctorForm';

const App = () => {
  return (
    <Router>
       <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/citas" element={<Citas />} />
        <Route path="/citas/:id" element={<DetalleCita />} />
        <Route path="/login" element={<Login />} />

        <Route path="/pacientes" element={<PacienteList/>}/>
        <Route path="/pacientes/nuevo" element={<Paciente />} />
        <Route path="/especialidad" element={<EspecialidadForm />} />
        <Route path="/doctor" element={<DoctorForm />} />
        <Route path="/pacientes/:id" element={<Paciente />} />

        <Route path="/clinicas" element={<ClinicasList />}/>
        <Route path="/clinicas/nueva" element={<ClinicaPage/>} />
        <Route path="/clinicas/:id" element={<ClinicaPage/>} />
        </Routes>
    </Router>
  );
};

export default App;
