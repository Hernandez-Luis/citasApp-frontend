import React from 'react';

export const CitasItem = ({ citas, onSelect, onDelete }) => {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center shadow-sm mb-2">
      <div>
        <h5><strong>Paciente: </strong> {citas.paciente.nombrePaciente}</h5>
        <p className="mb-1 text-muted">Fecha de la cita: {citas.fechaCita}</p>
        <p className="mb-1 text-muted">Hora de la cita: {citas.horaCita}</p>
        <p className="mb-1 text-muted">Motivo de la visita: {citas.motivo}</p>
      </div>
      <div>
        <button className="btn btn-warning btn-sm mr-2" onClick={() => onSelect(citas.id)}>
          Editar
        </button>
        <button className="btn btn-danger btn-sm" onClick={() => onDelete(citas.id)}>
          Eliminar
        </button>
      </div>
    </li>
  );
};
