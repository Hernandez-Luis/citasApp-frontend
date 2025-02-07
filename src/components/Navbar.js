import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUserMd, FaHospital, FaUser, FaClipboardList, FaStethoscope, FaBars } from "react-icons/fa";
import citamedica from '../assets/cita-medica.png'; // Ruta hacia la imagen en assets
import './Navbar.css'; // Hoja de estilos

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand" to="/">Mi Clínica</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <FaBars className="menu-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/"><FaHome className="nav-icon" /> Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/citas"><FaClipboardList className="nav-icon" /> Citas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/clinicas"><FaHospital className="nav-icon" /> Clínicas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/pacientes"><FaUser className="nav-icon" /> Pacientes</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/doctor"><FaUserMd className="nav-icon" /> Doctores</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/especialidad"><FaStethoscope className="nav-icon" /> Especialidades</Link>
            </li>
          </ul>
        </div>
        <img src={citamedica} alt="Logo" className="navbar-img" />
      </div>
    </nav>
  );
};

export default Navbar;
