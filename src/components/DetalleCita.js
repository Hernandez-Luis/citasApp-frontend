import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CitaService from '../services/CitaService';

const DetalleCita = () => {
  const { id } = useParams();
  const [cita, setCita] = useState(null);

  useEffect(() => {
    const fetchCita = async () => {
      const fetchedCita = await CitaService.getCitaById(id);
      setCita(fetchedCita);
    };
    fetchCita();
  }, [id]);

  if (!cita) return <p>Cargando...</p>;

  return (
    <div>
      <h2>{cita.nombre}</h2>
      <p>{new Date(cita.fecha).toLocaleString()}</p>
      <p>{cita.descripcion}</p>
    </div>
  );
};

export default DetalleCita;
