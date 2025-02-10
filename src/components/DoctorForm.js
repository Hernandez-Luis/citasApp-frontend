import React, { useState, useEffect } from "react";
import doctorService from "../services/DoctorService"; // Servicio de Doctores
import especialidadService from "../services/EspecialidadService"; // Servicio de Especialidades
import "../components/DoctorFormStyle.css"; 
import Swal from 'sweetalert2';
import { formToJSON } from "axios";

const DoctorForm = () => {
    const [formData, setFormData] = useState({
        nombre_doctor: "",
        telefono: "",
        correo: "",
        especialidad: {}, // Inicializado como objeto vacío
    });

    const [especialidades, setEspecialidades] = useState([]);
    const [doctores, setDoctores] = useState([]);
    const [editing, setEditing] = useState(false);
    const [currentDoctorId, setCurrentDoctorId] = useState(null);

    useEffect(() => {
        // Cargar especialidades para el dropdown
        especialidadService.getAll().then(setEspecialidades);
        // Cargar todos los doctores
        doctorService.getAll().then(setDoctores);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "especialidad") {
            // Actualizar especialidad con el objeto { id: value }
            setFormData((prev) => ({
                ...prev,
                especialidad: { id: value },  // Asigna el valor como un objeto con el id
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleCreate = async () => {

        
        try {
            const newDoctor = await doctorService.create(formData);
            setDoctores((prev) => [...prev, newDoctor]);
            mostrarExito("Se ha agregado un nuevo doctor de manera exitosa.");
            setFormData({ nombre_doctor: "", telefono: "", correo: "", especialidad: {} });
        } catch (error) {
          mostrarError("Ups! Ocurrio un error inesperado")
          console.error("Error al crear doctor:", error);
        }
    };

    const handleUpdate = async (id) => {
        try {
            const updatedDoctor = await doctorService.update(id, formData);
            setDoctores((prev) =>
                prev.map((doctor) => (doctor.id === id ? updatedDoctor : doctor))
            );
            setFormData({ nombre_doctor: "", telefono: "", correo: "", especialidad: {} });
            setEditing(false);
            setCurrentDoctorId(null);
            mostrarExito("El doctor se actualizoo de manera exitosa.")
        } catch (error) {
          mostrarError("Ups! Ocurrio un error inesperado")
          console.error("Error al actualizar doctor:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await doctorService.deleteDoctor(id);
            setDoctores((prev) => prev.filter((doctor) => doctor.id !== id));
            mostrarExito("Eliminado de manera exitosa.")
        } catch (error) {
          mostrarError("Ups! Ocurrio un error inesperado")
          console.error("Error al eliminar doctor:", error);
        }
    };

    const handleEdit = (doctor) => {
        setEditing(true);
        setFormData({
            nombre_doctor: doctor.nombre_doctor,
            telefono: doctor.telefono,
            correo: doctor.correo,
            especialidad: doctor.especialidad,  // Mantener el objeto de especialidad completo
        });
        setCurrentDoctorId(doctor.id);
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
        <div className="doctor-container">
  <h2 className="titulo-formulario">{editing ? "Editar Doctor" : "Crear Doctor"}</h2>
  <div className="doctor-form">
    <div className="form-group">
      <label className="etiqueta">Nombre del Doctor:</label>
      <input
        type="text"
        name="nombre_doctor"
        value={formData.nombre_doctor}
        onChange={handleChange}
        className="input"
        required
      />
    </div>
    <div className="form-group">
      <label className="etiqueta">Teléfono:</label>
      <input
        type="text"
        name="telefono"
        value={formData.telefono}
        onChange={handleChange}
        className="input"
        required
      />
    </div>
    <div className="form-group">
      <label className="etiqueta">Correo:</label>
      <input
        type="email"
        name="correo"
        value={formData.correo}
        onChange={handleChange}
        className="input"
        required
      />
    </div>
    <div className="form-group">
      <label className="etiqueta">Especialidad:</label>
      <select
        name="especialidad"
        value={formData.especialidad.id || ""}
        onChange={handleChange}
        className="select"
        required
      >
        <option value="">Selecciona una especialidad</option>
        {especialidades.map((especialidad) => (
          <option key={especialidad.id} value={especialidad.id}>
            {especialidad.nombre_especialidad}
          </option>
        ))}
      </select>
    </div>
    <div className="form-buttons">
      {editing ? (
        <button className="btn btn-update" onClick={() => handleUpdate(currentDoctorId)}>
          Actualizar Doctor
        </button>
      ) : (
        <button className="btn btn-create" onClick={handleCreate}>
          Crear Doctor
        </button>
      )}
    </div>
  </div>

  <h3 className="titulo-lista">Lista de Doctores</h3>
  <ul className="lista-doctores">
    {doctores.map((doctor) => (
      <li key={doctor.id} className="item-doctor">
        <p>
          <strong>Doctor: </strong> {doctor.nombre_doctor} <strong>Telefono: </strong> {doctor.telefono}  <strong>Correo: </strong> {doctor.correo} <strong>Especialidad: </strong>
          {doctor.especialidad ? doctor.especialidad.nombre_especialidad : "Sin especialidad"}
        </p>
        <div className="botones-doctor">
          <button className="btn btn-editar" onClick={() => handleEdit(doctor)}>
            Editar
          </button>
          <button className="btn btn-eliminar" onClick={() => handleDelete(doctor.id)}>
            Eliminar
          </button>
        </div>
      </li>
    ))}
  </ul>
</div>

    );
};

export default DoctorForm;
