import React, { useState, useEffect } from "react";
import pacienteService from "../../services/PacienteServices"; 
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const PacienteForm = ({ pacienteId }) => {
  const [paciente, setPaciente] = useState({
    nombrePaciente: "",
    edad: "",
    peso: "",
    informacionAdicional: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (pacienteId) {
      fetchPaciente(pacienteId);
    }
  }, [pacienteId]);

  const fetchPaciente = async (id) => {
    const data = await pacienteService.getPacientesById(id);
    setPaciente(data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaciente({
      ...paciente,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      if (pacienteId) {
        await pacienteService.updatePacientes(paciente, pacienteId);
        Swal.fire({
          title: "Registro exitoso",
          text: "El paciente ha sido registrada correctamente.",
          icon: "success",
          confirmButtonText: "Aceptar",
          timer: 3000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.getConfirmButton().style.backgroundColor = "blue";
          }
        });
      } else {
        await pacienteService.createPacientes(paciente);
        setIsLoading(false);

        Swal.fire({
          title: "Registro exitoso",
          text: "El paciente ha sido registrada correctamente.",
          icon: "success",
          confirmButtonText: "Aceptar",
          timer: 3000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.getConfirmButton().style.backgroundColor = "blue";
          }
        });
      }
      navigate("/pacientes");
    } catch (error) {
      setIsLoading(false);
      console.error("Error al guardar el paciente:", error);
    }
  };
  
  return (
    <div className="form-container">
      <h2>{pacienteId ? "Actualizar Paciente" : "Registrar Paciente"}</h2>
      <form onSubmit={handleSubmit} className="paciente-form">
        <div className="form-group">
          <label>Nombre del Paciente</label>
          <input
            type="text"
            name="nombrePaciente"
            value={paciente.nombrePaciente}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Edad</label>
          <input
            type="number"
            name="edad"
            value={paciente.edad}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Peso</label>
          <input
            type="number"
            step="0.1"
            name="peso"
            value={paciente.peso}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Información Adicional</label>
          <textarea
            name="informacionAdicional"
            value={paciente.informacionAdicional}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? "Guardando..." : "Guardar"}
        </button>
      </form>
    </div>
  );
};

export default PacienteForm;
