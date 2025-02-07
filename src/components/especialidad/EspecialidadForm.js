import React, { useState, useEffect } from "react";
import especialidadService from "../../services/EspecialidadService"; // Asegúrate de que la ruta es correcta
import { useNavigate } from "react-router-dom";

const EspecialidadForm = ({ especialidadId }) => {
  const [especialidad, setEspecialidad] = useState({
    nombre_especialidad: "",
    matricula: "",
    experiencia: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (especialidadId) {
      fetchEspecialidad(especialidadId);
    }
  }, [especialidadId]);

  const fetchEspecialidad = async (id) => {
    const data = await especialidadService.getById(id);
    setEspecialidad(data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEspecialidad({
      ...especialidad,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try{
        if (especialidadId) {
            await especialidadService.update(especialidadId, especialidad);
          } else {
            await especialidadService.create(especialidad);
          }
          setIsLoading(false);
          navigate("/especialidades");
        }catch (error) {
            setIsLoading(false);
            console.error("Error al guardar la especialidad", error);
          }
    };

  return (
    <div className="form-container">
      <h2>{especialidadId ? "Actualizar Especialidad" : "Registrar Especialidad"}</h2>
      <form onSubmit={handleSubmit} className="especialidad-form">
        <div className="form-group">
          <label>Nombre de la Especialidad</label>
          <input
            type="text"
            name="nombre_especialidad"
            value={especialidad.nombre_especialidad}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Matricula</label>
          <input
            type="text"
            name="matricula"
            value={especialidad.matricula}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Experiencia</label>
          <input
            type="text"
            name="experiencia"
            value={especialidad.experiencia}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? "Guardando..." : "Guardar"}
        </button>
      </form>
    </div>
  );
};

export default EspecialidadForm;
