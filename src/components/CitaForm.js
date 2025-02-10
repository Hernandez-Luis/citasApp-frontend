import React, { useEffect, useState } from 'react';
import CitaService from '../services/CitaService';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CitaForm = ({editarCita,onSubmit, cita, recuperarDoctores, recuperarPacientes, recuperarClinicas, actualizarListaCitas, modoEditar, idActualizarCita }) => {
  const navigate = useNavigate();
  const formularioInicial = {
    nombreMedico: "",
    fechaCita: "",
    hora: "",
    motivo: "",
    clinica: { id: 1 }, // Aquí ya se asume que 'clinica' es un objeto
    paciente: { id: 1 }, // Igual para 'paciente'
    idDoctorMongo: ""
  }

  const [formData, setFormData] = useState(formularioInicial);

  useEffect(() => {
    if (modoEditar) {
      console.log("ID ACTUALIZAR: ", idActualizarCita)
      llenarFormularioDatosActualizar()
    }
    console.log("clinicas: ", recuperarClinicas)
    console.log("Pacientes: ", recuperarPacientes)
    console.log("submit: ", onSubmit)
  }, []);

  useEffect(() => {
    console.log("editar: ", editarCita)
    if (modoEditar && cita) {
      setFormData(cita);  // Llenar el formulario con los datos de la cita
    }
  }, []);
  

  const llenarFormularioDatosActualizar = async () => {
    const cita = await CitaService.getCitasById(idActualizarCita);
    setFormData(cita);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Cuando se actualiza clinica o paciente, se actualiza como objeto
    if (name === "clinica") {
      const clinicaSeleccionada = recuperarClinicas.find(clinica => clinica.id_clinica === parseInt(value));
      setFormData(prevData => ({ ...prevData, clinica: clinicaSeleccionada }));
    } else if (name === "paciente") {
      const pacienteSeleccionado = recuperarPacientes.find(paciente => paciente.id_paciente === parseInt(value));
      setFormData(prevData => ({ ...prevData, paciente: pacienteSeleccionado }));
    } else {
      setFormData(prevData => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    console.log("datos: ", formData)

    try {
      // Si estamos editando, actualizamos la cita, si no creamos una nueva
      if (modoEditar) {
        await CitaService.updateCita(formData, idActualizarCita)
        navigate("/citas")
      } else {
        // Enviar el objeto con los IDs de clinica y paciente
        const citaAEnviar = {
          ...formData,
          clinica: { id_clinica: formData.clinica.id},
          paciente: { id_paciente: formData.paciente.id}
        };
        console.log("Datos enviados a la API:", JSON.stringify(citaAEnviar, null, 2));
        await CitaService.createCita(citaAEnviar);
      }

      setFormData(formularioInicial);
      actualizarListaCitas();

      mostrarExito("Cita creada de manera exitosa.")
    } catch (error) {
      console.log("Error al guardar la cita: ", error)
    }
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
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label className="form-label">Fecha de la cita</label>
            <input
              type="date"
              name="fechaCita"
              value={formData.fechaCita}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group mb-3">
            <label className="form-label">Hora de la cita</label>
            <input
              type="time"
              name="hora"
              value={formData.hora}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group mb-3">
            <label className="form-label">Motivo</label>
            <input
              type="text"
              name="motivo"
              value={formData.motivo}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group mb-3">
            <label className="form-label">Seleccionar clinica</label>
            <select
              className="p-2 border rounded-lg form-control"
              name="clinica"
              value={formData.clinica.id_clinica} // Usamos el id_clinica del objeto
              onChange={handleChange}>
              <option value="">Seleccione una opcion</option>
              {recuperarClinicas.map((item) => (
                <option key={item.id_clinica} value={item.id_clinica}>
                  {item.nombreClinica}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group mb-3">
            <label className="form-label">Seleccionar paciente</label>
            <select
              className="p-2 border rounded-lg form-control"
              name="paciente"
              value={formData.paciente.id_paciente} // Usamos el id_paciente del objeto
              onChange={handleChange}>
              <option value="">Seleccione una opcion</option>
              {recuperarPacientes.map((item) => (
                <option key={item.id_paciente} value={item.id_paciente}>
                  {item.nombrePaciente}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group mb-3">
            <label className="form-label">Seleccionar doctor</label>
            <select
              className="p-2 border rounded-lg form-control"
              name="idDoctorMongo"
              value={formData.idDoctorMongo}
              onChange={handleChange}>
              <option value="">Seleccione una opcion</option>
              {recuperarDoctores.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nombre_doctor}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Crear Cita
          </button>
        </form>
      </div>
    </div>
  );
};

export default CitaForm;
