import React from 'react';

export const ClinicaItem = ({ clinica, onSelect, onDelete }) => {
  return (
    <li className="clinica-item">
      <h4>{clinica.nombreClinica}</h4>
      <p>Ubicación: {clinica.ubicacion}</p>
      <button className="edit-btn" onClick={() => onSelect(clinica)}>
        Editar
      </button>
      <button className="delete-btn" onClick={() => onDelete(clinica.id)}>
        Eliminar
      </button>
    </li>
  );
};
