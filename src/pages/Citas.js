import React, { useState, useEffect } from 'react';
import CitaService from '../services/CitaService';
import CitaList from '../components/CitaList';
import CitaForm from '../components/CitaForm';

const Citas = () => {
  const [citas, setCitas] = useState([]);
  const [cita, setCita] = useState(null);

  useEffect(() => {
    const fetchCitas = async () => {
      setCitas(await CitaService.getCitas());
    };
    fetchCitas();
  }, [setCitas]);

  return (
    <div>
      <CitaForm cita={cita} setCita={setCita} setCitas={setCitas} />
      <CitaList citas={citas} />
    </div>
  );
};

export default Citas;
