import React, { useState, useEffect } from 'react';
import especialidadService from '../../services/Especialidad'; // Asegúrate de que la ruta es correcta
import './especialidad.css';

const EspecialidadForm = () => {
  const [especialidades, setEspecialidades] = useState([]);
  const [formData, setFormData] = useState({
    nombre_especialidad: '',
    matricula: '',
    experiencia: ''
  });

  // Cargar todas las especialidades al montar el componente
  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        const data = await especialidadService.getAll();
        setEspecialidades(data);
      } catch (error) {
        console.error("Error al obtener especialidades:", error);
      }
    };
    fetchEspecialidades();
  }, []);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Crear o actualizar una especialidad
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.id) {
      // Si existe un id, es una actualización
      await handleUpdate();
    } else {
      // Si no existe id, es una creación
      await handleCreate();
    }
  };

  const handleCreate = async () => {
    try {
      const newEspecialidad = await especialidadService.create(formData);
      setEspecialidades((prev) => [...prev, newEspecialidad]);
      setFormData({ id: '', nombre_especialidad: '', matricula: '', experiencia: '' });
    } catch (error) {
      console.error("Error al crear especialidad:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedEspecialidad = await especialidadService.update(formData.id, formData);
      setEspecialidades((prev) =>
        prev.map((especialidad) =>
          especialidad.id === formData.id ? updatedEspecialidad : especialidad
        )
      );
      setFormData({ id: '', nombre_especialidad: '', matricula: '', experiencia: '' });
    } catch (error) {
      console.error("Error al actualizar especialidad:", error);
    }
  };

  const handleDelete = async (id) => {
    console.log("Id: ", id)
    try {
      await especialidadService.deleteEspecialidad(id);
      setEspecialidades((prev) => prev.filter((especialidad) => especialidad.id !== id));
    } catch (error) {
      console.error("Error al eliminar especialidad:", error);
    }
  };

  const handleEdit = (especialidad) => {
    setFormData({
      id: especialidad.id,
      nombre_especialidad: especialidad.nombre_especialidad,
      matricula: especialidad.matricula,
      experiencia: especialidad.experiencia
    });
  };

  return (
    <div>
      <h2>Formulario de Especialidad</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre de Especialidad:</label>
          <input
            type="text"
            name="nombre_especialidad"
            value={formData.nombre_especialidad}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Matricula:</label>
          <input
            type="text"
            name="matricula"
            value={formData.matricula}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Experiencia:</label>
          <input
            type="text"
            name="experiencia"
            value={formData.experiencia}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{formData.id ? 'Actualizar' : 'Crear'} Especialidad</button>
      </form>

      <h3>Lista de Especialidades</h3>
      <ul>
        {especialidades.map((especialidad) => (
          <li key={especialidad.id}>
            <div>
              <strong>{especialidad.nombre_especialidad}</strong> - {especialidad.matricula} - {especialidad.experiencia}
              <button onClick={() => handleEdit(especialidad)}>Editar</button>
              <button onClick={() => handleDelete(especialidad.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EspecialidadForm;
