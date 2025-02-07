import React, { useState, useEffect } from 'react';

export const ClinicaForm = ({ onSubmit, clinica }) => {
  const [formData, setFormData] = useState({
    nombreClinica: '',
    ubicacion: '',
  });

  useEffect(() => {
    if (clinica) {
      setFormData({
        nombreClinica: clinica.nombreClinica,
        ubicacion: clinica.ubicacion,
      });
    }
  }, [clinica]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ nombreClinica: '', ubicacion: '' });
  };

  return (
    <div className="clinica-form">
      <h2>{clinica ? 'Editar Clínica' : 'Crear Clínica'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre de la Clínica</label>
          <input
            type="text"
            name="nombreClinica"
            value={formData.nombreClinica}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Ubicación</label>
          <input
            type="text"
            name="ubicacion"
            value={formData.ubicacion}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          {clinica ? 'Actualizar Clínica' : 'Crear Clínica'}
        </button>
      </form>
    </div>
  );
};
