import React, { useEffect, useState } from "react";
import clinicaService from "../../services/ClinicaService";
import { Link } from "react-router-dom";

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
  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta clínica?")) {
      await clinicaService.deleteClinicas(id);
      // Actualizar la lista después de eliminar
      setClinicas(clinicas.filter((clinica) => clinica.id_clinica !== id));
    }
  };

  return (
    <div className="clinica-list">
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
