import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


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
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-center">{clinica ? 'Editar Clínica' : 'Crear Clínica'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label className="form-label">Nombre de la Clínica</label>
            <input
              type="text"
              name="nombreClinica"
              value={formData.nombreClinica}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label className="form-label">Ubicación</label>
            <input
              type="text"
              name="ubicacion"
              value={formData.ubicacion}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            {clinica ? 'Actualizar Clínica' : 'Crear Clínica'}
          </button>
        </form>
      </div>
    </div>
  );
};
