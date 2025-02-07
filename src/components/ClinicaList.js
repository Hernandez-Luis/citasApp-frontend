import React from 'react';
import { ClinicaItem } from './ClinicaItem';

export const ClinicaList = ({ clinicas, onSelect, onDelete }) => {
  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center">Clínicas Disponibles</h3>
      {clinicas.length === 0 ? (
        <p className="text-center text-muted">No hay clínicas disponibles.</p>
      ) : (
        <ul className="list-group">
          {clinicas.map((clinica) => (
            <ClinicaItem key={clinica.id} clinica={clinica} onSelect={onSelect} onDelete={onDelete} />
          ))}
        </ul>
      )}
    </div>
  );
};
