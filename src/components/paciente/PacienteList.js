import React, { useEffect, useState } from "react";
import pacienteService from "../../services/PacienteServices";
import { Link } from "react-router-dom";
import "../paciente/Paciente.css"; // Asegúrate de importar el archivo CSS

const PacienteListPage = () => {
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    const fetchPacientes = async () => {
      const data = await pacienteService.getPacientes();
      setPacientes(data);
    };
    fetchPacientes();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este paciente?")) {
      await pacienteService.deletePacientes(id);
      setPacientes(pacientes.filter((paciente) => paciente.id_paciente !== id)); // Ajustado para usar 'id_paciente'
    }
  };

  return (
    <div className="paciente-list container mt-5">
      <h2>Lista de Pacientes</h2>
      <Link to="/pacientes/nuevo" className="btn btn-primary mb-3">
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
            <tr key={paciente.id_paciente}>
              <td>{paciente.nombrePaciente}</td>
              <td>{paciente.edad}</td>
              <td>{paciente.peso}</td>
              <td>
                <Link to={`/pacientes/${paciente.id_paciente}`} className="btn btn-warning">
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(paciente.id_paciente)}
                  className="btn btn-danger ml-2"
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

export default PacienteListPage;
