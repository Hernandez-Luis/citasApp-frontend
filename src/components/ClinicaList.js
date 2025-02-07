import React from 'react';
import { ClinicaItem } from './ClinicaItem';

export const ClinicaList = ({ clinicas, onSelect, onDelete }) => {
  return (
    <div className="clinica-list">
      <h3>Clínicas Disponibles</h3>
      {clinicas.length === 0 ? (
        <p>No hay clínicas disponibles.</p>
      ) : (
        <ul>
          {clinicas.map((clinica) => (
            <ClinicaItem key={clinica.id} clinica={clinica} onSelect={onSelect} onDelete={onDelete} />
          ))}
        </ul>
      )}
    </div>
  );
};
