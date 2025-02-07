import React, { useEffect, useState } from "react";
import clinicaService from "../../services/ClinicaService";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const ClinicaList = () => {
  const [clinicas, setClinicas] = useState([]);

  // Obtener lista de clínicas al cargar el componente
  useEffect(() => {
    const fetchClinicas = async () => {
      const data = await clinicaService.getClinicas();
      setClinicas(data);
    };
    fetchClinicas();
  }, []);

  // Función para eliminar clínica
   // Función para eliminar clínica con confirmación
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
          await clinicaService.deleteClinicas(id);
          setClinicas(clinicas.filter((clinica) => clinica.id_clinica !== id));

          Swal.fire({
            title: "Eliminado",
            text: "La clínica ha sido eliminada correctamente.",
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
      <h2>Lista de Clínicas</h2>
      <Link to="/clinicas/nueva" className="btn btn-primary">
        Registrar Nueva Clínica
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Ubicación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clinicas.map((clinica) => (
            <tr key={clinica.id_clinica}>
              <td>{clinica.nombreClinica}</td>
              <td>{clinica.ubicacion}</td>
              <td>
                <Link to={`/clinicas/${clinica.id_clinica}`} className="btn btn-warning">
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(clinica.id_clinica)}
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

export default ClinicaList;
