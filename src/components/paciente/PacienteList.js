import React, { useEffect, useState } from "react";
import pacienteService from "../../services/PacienteServices";
import { Link } from "react-router-dom";

const PacienteList = () => {
  const [pacientes, setPacientes] = useState([]);

  // Obtener lista de pacientes al cargar el componente
  useEffect(() => {
    const fetchPacientes = async () => {
      const data = await pacienteService.getPacientes();
      setPacientes(data);
    };
    fetchPacientes();
  }, []);

  // Función para eliminar paciente
  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este paciente?")) {
      await pacienteService.deletePacientes(id);
      // Actualizar la lista después de eliminar
      setPacientes(pacientes.filter((paciente) => paciente.id !== id));
    }
  };
  return (
    <div className="paciente-list">
      <h2>Lista de Pacientes</h2>
      <Link to="/pacientes/nuevo" className="btn btn-primary">
        Registrar Nuevo Paciente
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Peso</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((paciente) => (
            <tr key={paciente.id}>
              <td>{paciente.nombrePaciente}</td>
              <td>{paciente.edad}</td>
              <td>{paciente.peso}</td>
              <td>
                <Link to={`/pacientes/${paciente.id}`} className="btn btn-warning">
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(paciente.id)}
                  className="btn btn-danger"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PacienteList;
