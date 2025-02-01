import React, { useState } from 'react';
import CitaService from '../services/CitaService';

const CitaForm = ({ cita, setCita, setCitas }) => {
  const [formData, setFormData] = useState(cita || { nombre: '', fecha: '', descripcion: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cita) {
      await CitaService.updateCita(formData);
    } else {
      await CitaService.createCita(formData);
    }
    setCitas(await CitaService.getCitas());
    setCita(null); // Reset form state
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        placeholder="Nombre"
        required
      />
      <input
        type="datetime-local"
        name="fecha"
        value={formData.fecha}
        onChange={handleChange}
        required
      />
      <textarea
        name="descripcion"
        value={formData.descripcion}
        onChange={handleChange}
        placeholder="Descripción"
        required
      />
      <button type="submit">{cita ? 'Actualizar Cita' : 'Crear Cita'}</button>
    </form>
  );
};

export default CitaForm;
