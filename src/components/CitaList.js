import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CitaService from '../services/CitaService';
import { CitasItem } from './CitasItem';

const CitaList = ({citasRegistradas, onSelect, onDelete}) => {

  return (
    <div className="container mt-4">
          <h3 className="mb-4 text-center">Citas agregadas</h3>
          {citasRegistradas.length === 0 ? (
            <p className="text-center text-muted">No hay clínicas disponibles.</p>
          ) : (
            <ul className="list-group">
              {citasRegistradas.map((citas) => (
                <CitasItem key={citas.id} citas={citas} onSelect={onSelect} onDelete={onDelete} />
              ))}
            </ul>
          )}
        </div>
  );
};

export default CitaList;
