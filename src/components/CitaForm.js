import React, { useEffect, useState } from 'react';
import CitaService from '../services/CitaService';
import { useNavigate } from 'react-router-dom';

const CitaForm = ({ recuperarDoctores,recuperarPacientes,recuperarClinicas, actualizarListaCitas, modoEditar, idActualizarCita }) => {
  const navigate = useNavigate();
  const formularioInicial = {
    nombreMedico: "",
    fechaCita: "",
    motivo: "",
    clinica: "",
    paciente: "",
    idDoctorMongo: ""
  }
  useEffect(() => {
    if (modoEditar) {
      console.log("ID ACTUALIZAR: ", idActualizarCita)
      llenarFormularioDatosActualizar()
    }
    console.log("clinicas: ", recuperarClinicas)
    console.log("Pacientes: ", recuperarPacientes)
  }, []);

  const llenarFormularioDatosActualizar = async () => {
    setFormData(await CitaService.getCitasById(idActualizarCita));
  }

  const [formData, setFormData] = useState(formularioInicial);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("idddd: ", idActualizarCita)
    try {
      if (modoEditar) {
        await CitaService.updateCita(formData, idActualizarCita)
        navigate("/citas")
      } else {
        await CitaService.createCita(formData)
      }

      setFormData(formularioInicial);

      actualizarListaCitas();
    } catch (error) {
      console.log("Error al guardar la cita: ", error)
    }

  };



  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        {/* <h2 className="text-center">{clinica ? 'Editar Clínica' : 'Crear Clínica'}</h2> */}
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label className="form-label">Nombre del medico</label>
            <input
              type="text"
              name="nombreMedico"
              value={formData.nombreMedico}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label className="form-label">Fecha de la cita</label>
            <input
              type="text"
              name="fechaCita"
              value={formData.fechaCita}
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
            <select className="p-2 border rounded-lg form-control">
              <option value="">Seleccione una opcion</option>
              {recuperarClinicas.map((item) => (
                <option key={item.id_clinica} value={item.nombreClinica}>
                  {item.nombreClinica}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group mb-3">
            <label className="form-label">Seleccionar paciente</label>
            <select className="p-2 border rounded-lg form-control">
              <option value="">Seleccione una opcion</option>
              {recuperarPacientes.map((item) => (
                <option key={item.id_paciente} value={item.nombrePaciente}>
                  {item.nombrePaciente}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group mb-3">
            <label className="form-label">Seleccionar paciente</label>
            <select className="p-2 border rounded-lg form-control">
              <option value="">Seleccione una opcion</option>
              {recuperarPacientes.map((item) => (
                <option key={item.id_paciente} value={item.nombrePaciente}>
                  {item.nombrePaciente}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Crear Clínica
          </button>
        </form>
      </div>
    </div>
  );
};

export default CitaForm;
