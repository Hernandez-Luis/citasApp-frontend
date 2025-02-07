import React, { useState, useEffect } from "react";
import especialidadService from "../../services/Especialidad"; // Asegúrate de que la ruta es correcta
import { Link } from "react-router-dom";

const EspecialidadList = () => {
  const [especialidades, setEspecialidades] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEspecialidades();
  }, []);

  const fetchEspecialidades = async () => {
    try {
      const data = await especialidadService.getAll();
      console.log(data); // Verifica los datos recibidos
      setEspecialidades(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error al cargar especialidades", error);
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await especialidadService.deleteEspecialidad(id);
      fetchEspecialidades(); // Refrescar la lista después de eliminar
    } catch (error) {
      console.error("Error al eliminar especialidad", error);
    }
  };

  return (
    <div className="especialidad-list">
      <h2>Lista de Especialidades</h2>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Matricula</th>
              <th>Experiencia</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {especialidades.length > 0 ? (
              especialidades.map((especialidad) => (
                <tr key={especialidad.id}>
                  <td>{especialidad.nombre_especialidad}</td>
                  <td>{especialidad.matricula}</td>
                  <td>{especialidad.experiencia}</td>
                  <td>
                    <Link to={`/especialidades/${especialidad.id}`}>Editar</Link>
                    <button onClick={() => handleDelete(especialidad.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No hay especialidades disponibles.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EspecialidadList;
