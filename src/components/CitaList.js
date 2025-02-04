import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CitaService from '../services/CitaService';

const CitaList = ({citasRegistradas}) => {

  if (!citasRegistradas) {
    citasRegistradas = [];
  }

  return (
    <div>
      <h2>Lista de Citas</h2>
      <ul>
        {citasRegistradas.map((cita) => (
          <li key={cita.id}>
            <Link to={`/citas/${cita.id}`}>{cita.nombrePaciente}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CitaList;
