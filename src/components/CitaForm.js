import React, { useEffect, useState } from 'react';
import CitaService from '../services/CitaService';
import { useNavigate } from 'react-router-dom';

const CitaForm = ({actualizarListaCitas, modoEditar, idActualizarCita}) => {
  const navigate = useNavigate();
  const formularioInicial = {
    nombreMedico: "",
    fechaCita: "",
    condicion: "",
    nombrePaciente: "",
    edad: "",
    motivo: ""
  }
  useEffect(() =>{
    if(modoEditar){
      console.log("ID ACTUALIZAR: ", idActualizarCita)
      llenarFormularioDatosActualizar()
    }
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
      if(modoEditar){
        await CitaService.updateCita(formData,idActualizarCita)
        navigate("/citas")
      } else{
        await CitaService.createCita(formData)
      }

      setFormData(formularioInicial);

      actualizarListaCitas();
    } catch (error) {
      console.log("Error al guardar la cita: ", error)
    }

  };

  

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="nombrePaciente"
        value={formData.nombrePaciente}
        onChange={handleChange}
        placeholder="Nombre"
        required
      />
      <input
        type="datetime-local"
        name="fechaCita"
        value={formData.fechaCita}
        onChange={handleChange}
        required
      />
      <textarea
        name="condicion"
        value={formData.condicion}
        onChange={handleChange}
        placeholder="Descripción"
        required
      />
    <button type="submit">{modoEditar ? "Actualizar Cita" : "Crear Cita"}</button>
</form>
  );
};

export default CitaForm;
