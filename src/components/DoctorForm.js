import React, { useState, useEffect } from "react";
import doctorService from "../services/DoctorService"; // Servicio de Doctores
import especialidadService from "../services/Especialidad"; // Servicio de Especialidades

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
            setFormData({ nombre_doctor: "", telefono: "", correo: "", especialidad: {} });
        } catch (error) {
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
        } catch (error) {
            console.error("Error al actualizar doctor:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await doctorService.deleteDoctor(id);
            setDoctores((prev) => prev.filter((doctor) => doctor.id !== id));
        } catch (error) {
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

    return (
        <div>
            <h2>{editing ? "Editar Doctor" : "Crear Doctor"}</h2>
            <div>
                <label>Nombre del Doctor:</label>
                <input
                    type="text"
                    name="nombre_doctor"
                    value={formData.nombre_doctor}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Teléfono:</label>
                <input
                    type="text"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Correo:</label>
                <input
                    type="email"
                    name="correo"
                    value={formData.correo}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Especialidad:</label>
                <select
                    name="especialidad"
                    value={formData.especialidad.id || ""}  // Asegúrate de acceder al id del objeto
                    onChange={handleChange}
                >
                    <option value="">Selecciona una especialidad</option>
                    {especialidades.map((especialidad) => (
                        <option key={especialidad.id} value={especialidad.id}>
                            {especialidad.nombre_especialidad}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                {editing ? (
                    <button onClick={() => handleUpdate(currentDoctorId)}>Actualizar Doctor</button>
                ) : (
                    <button onClick={handleCreate}>Crear Doctor</button>
                )}
            </div>

            <h3>Lista de Doctores</h3>
            <ul>
                {doctores.map((doctor) => (
                    <li key={doctor.id}>
                        <p>
                            {doctor.nombre_doctor} - {doctor.telefono} - {doctor.correo} -{" "}
                            {doctor.especialidad ? doctor.especialidad.nombre_especialidad : "Sin especialidad"}
                        </p>
                        <button onClick={() => handleEdit(doctor)}>Editar</button>
                        <button onClick={() => handleDelete(doctor.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DoctorForm;
