import React from 'react';
import { Link } from 'react-router-dom';

const CitaList = ({ citas }) => {
  return (
    <div>
      <h2>Lista de Citas</h2>
      <ul>
        {citas.map((cita) => (
          <li key={cita._id}>
            <Link to={`/citas/${cita._id}`}>{cita.nombre}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CitaList;
