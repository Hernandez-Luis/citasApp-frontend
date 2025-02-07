import React from 'react';
import { Link } from 'react-router-dom';
import citamedica from '../assets/cita-medica.png'; // Ruta hacia la imagen en assets

import './Navbar.css'; // Asegúrate de incluir esta hoja de estilos para la imagen

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">Mi Clínica</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/citas">Citas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/clinicas">Clinicas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/pacientes">Pacientes</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/especialidades">Especialidad</Link>
            </li>
            
          </ul>
        </div>
      </div>
      <img src={citamedica} alt="Logo" className="navbar-img mt-4" />
    </nav>
  );
};

export default Navbar;
