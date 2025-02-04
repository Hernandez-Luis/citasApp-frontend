import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CitaService from '../services/CitaService';
import CitaForm from './CitaForm';

const DetalleCita = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cita, setCita] = useState(null);
  const [modoEditar, setModoEditar] = useState(false);
  const [listaCitas,setListaCitas] = useState([]);
  
    useEffect(() =>{
      actualizarListaCitas();
    }, []);
  
    const actualizarListaCitas = async () => {
      try{
        const data = await CitaService.getCitas();
        setListaCitas(data);
      } catch(error){
        console.log("Error al obtener las citas: ", error);
      }
    }
  

  useEffect(() => {
    buscarCita();
  }, [id]);

  useEffect(() =>{
    setModoEditar(true);
  },[])

  const buscarCita = async () => {
    console.log("id cita: ", id)
    try {
      const citaEncontrada = await CitaService.getCitasById(id);
      setCita(citaEncontrada);       
    } catch (error) {
     console.error("Error al obtener la cita por ID: ", error) 
    }
  };

  const eliminarCita = async () => {
    try {
      await CitaService.deleteCita(id)
      navigate("/citas");
    } catch (error) {
      console.error("Error al eliminar la cita: ", error)
    }
  }

  if (!cita) return <p>Cargando...</p>;

  return (
    <div>
      <h2>{cita.nombrePaciente}</h2>
      <p><strong>Fecha de la cita: </strong>{new Date(cita.fechaCita).toLocaleString()}</p>
      <p><strong>Condicion del paciente: </strong>{cita.condicion}</p>

      <button onClick={eliminarCita}>Desea eliminar?</button>

      <CitaForm actualizarListaCitas={actualizarListaCitas} modoEditar={modoEditar} idActualizarCita={id}></CitaForm>
    </div>
  );
};

export default DetalleCita;
