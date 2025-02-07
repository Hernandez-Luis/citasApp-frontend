import React, { useState, useEffect } from "react";
import clinicaService from "../../services/ClinicaService"; // Ajusta la ruta al archivo de servicio
import "../paciente/Paciente.css";

import { useNavigate } from "react-router-dom";

const ClinicaForm = ({ clinicaId }) => {
  const [clinica, setClinica] = useState({
    nombreClinica: "",
    ubicacion: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (clinicaId) {
      fetchClinica(clinicaId);
    }
  }, [clinicaId]);

  const fetchClinica = async (id) => {
    const data = await clinicaService.getClinicasById(id);
    setClinica(data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClinica({
      ...clinica,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (clinicaId) {
        await clinicaService.updateClinicas(clinica, clinicaId);
      } else {
        await clinicaService.createClinicas(clinica);
      }
      setIsLoading(false);
      navigate("/clinicas"); // Redirigir a la lista de clínicas después de guardar
    } catch (error) {
      setIsLoading(false);
      console.error("Error al guardar la clínica:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>{clinicaId ? "Actualizar Clínica" : "Registrar Clínica"}</h2>
      <form onSubmit={handleSubmit} className="paciente-form">
        <div className="form-group">
          <label>Nombre de la Clínica</label>
          <input
            type="text"
            name="nombreClinica"
            value={clinica.nombreClinica}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Ubicación</label>
          <input
            type="text"
            name="ubicacion"
            value={clinica.ubicacion}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? "Guardando..." : "Guardar"}
        </button>
      </form>
    </div>
  );
};

export default ClinicaForm;
