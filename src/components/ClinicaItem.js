import React from 'react';

export const ClinicaItem = ({ clinica, onSelect, onDelete }) => {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center shadow-sm mb-2">
      <div>
        <h5>{clinica.nombreClinica}</h5>
        <p className="mb-1 text-muted">Ubicación: {clinica.ubicacion}</p>
      </div>
      <div>
        <button className="btn btn-warning btn-sm mr-2" onClick={() => onSelect(clinica)}>
          Editar
        </button>
        <button className="btn btn-danger btn-sm" onClick={() => onDelete(clinica.id)}>
          Eliminar
        </button>
      </div>
    </li>
  );
};
