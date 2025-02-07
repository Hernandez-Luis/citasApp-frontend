import React, { useState, useEffect } from 'react';
import especialidadService from '../../services/EspecialidadService'; // Asegúrate de que la ruta es correcta
import './especialidad.css';
import Swal from 'sweetalert2';

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
      setFormData({nombre_especialidad: '', matricula: '', experiencia: '' });
      mostrarExito("Especialidad creada de manera exitosa.")
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
      setFormData({nombre_especialidad: '', matricula: '', experiencia: '' });
      mostrarExito("Especialidad actualizada de manera exitosa")
    } catch (error) {
      console.error("Error al actualizar especialidad:", error);
    }
  };

  const handleDelete = async (id) => {
    console.log("Id: ", id)
    try {
      await especialidadService.deleteEspecialidad(id);
      setEspecialidades((prev) => prev.filter((especialidad) => especialidad.id !== id));
      mostrarExito("Especialidad eliminada de manera exitosa")
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

  const mostrarAlerta = (config) => {
        Swal.fire({
          ...config,
          timer: 5000,
          timerProgressBar: true,
          didOpen: () => {
            const confirmButton = Swal.getConfirmButton();
            confirmButton.style.backgroundColor = 'blue';
          },
        });
      };
    
      const mostrarError = (mensajeHTML) => {
        mostrarAlerta({
          title: 'Error',
          html: mensajeHTML, // Usa HTML para mostrar los errores sin viñetas
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      };
    
    
    
      const mostrarExito = (mensaje) => {
        mostrarAlerta({
          title: 'Éxito',
          text: mensaje,
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
      };

  return (
    <div className="form-container">
  <h2 className="titulo-formulario">Formulario de Especialidad</h2>
  <form onSubmit={handleSubmit} className="especialidad-form">
    <div className="form-group">
      <label className="etiqueta">Nombre de Especialidad:</label>
      <input
        type="text"
        name="nombre_especialidad"
        value={formData.nombre_especialidad}
        onChange={handleChange}
        required
        className="input"
      />
    </div>
    <div className="form-group">
      <label className="etiqueta">Matrícula:</label>
      <input
        type="text"
        name="matricula"
        value={formData.matricula}
        onChange={handleChange}
        required
        className="input"
      />
    </div>
    <div className="form-group">
      <label className="etiqueta">Experiencia:</label>
      <input
        type="text"
        name="experiencia"
        value={formData.experiencia}
        onChange={handleChange}
        required
        className="input"
      />
    </div>
    <button type="submit" className="btn-submit">
      {formData.id ? "Actualizar" : "Crear"} Especialidad
    </button>
  </form>

  <h3 className="titulo-lista">Lista de Especialidades</h3>
  <ul className="lista-especialidades">
    {especialidades.map((especialidad) => (
      <li key={especialidad.id} className="item-especialidad">
        <div className="info-especialidad">
          <strong>Especialidad: </strong>{especialidad.nombre_especialidad} - <strong>Matricula: </strong>{especialidad.matricula} - <strong>Experiencia: </strong>{especialidad.experiencia}
        </div>
        <div className="botones-especialidad">
          <button className="btn-editar" onClick={() => handleEdit(especialidad)}>Editar</button>
          <button className="btn-eliminar" onClick={() => handleDelete(especialidad.id)}>Eliminar</button>
        </div>
      </li>
    ))}
  </ul>
</div>

  );
};

export default EspecialidadForm;
