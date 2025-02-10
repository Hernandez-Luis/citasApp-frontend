import React, { useEffect, useState } from "react";
import pacienteService from "../../services/PacienteServices";
import { Link } from "react-router-dom";
import "../paciente/Paciente.css"; // Asegúrate de importar el archivo CSS
import Swal from "sweetalert2";
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";


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
    Swal.fire({
          title: "¿Estás seguro?",
          text: "Esta acción no se puede deshacer.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Sí, eliminar",
          cancelButtonText: "Cancelar",
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
      await pacienteService.deletePacientes(id);
      setPacientes(pacientes.filter((paciente) => paciente.id_paciente !== id)); // Ajustado para usar 'id_paciente'
      Swal.fire({
            title: "Eliminado",
            text: "El paciente ha sido eliminada correctamente.",
            icon: "success",
            timer: 3000,
            timerProgressBar: true,
          });
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: "Hubo un problema al eliminar la clínica.",
            icon: "error",
          });
        }
      }
      });
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
                <Link to={`/pacientes/${paciente.id_paciente}`} className="me-4 btn btn-warning">
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
