import React, { useState, useEffect } from 'react';
import CitaService from '../services/CitaService';
import CitaList from '../components/CitaList';
import CitaForm from '../components/CitaForm';
import ClinicaService from '../services/ClinicaService';
import PacienteService from '../services/PacienteServices';
import DoctorService from '../services/DoctorService';

const Citas = () => {

  const [listaCitas,setListaCitas] = useState([]);
  const [listaClinicas,setListaClinicas] = useState([]);
  const [listaPacientes,setListaPacientes] = useState([]);
  const [listaDoctores, setListaDoctores] = useState([]);

  useEffect(() =>{
    actualizarListaCitas();
    recuperarClinicas();
    recuperarPacientes();
    recuperarDoctores();
  }, []);

  const actualizarListaCitas = async () => {
    try{
      const data = await CitaService.getCitas();
      setListaCitas(data);
    } catch(error){
      console.log("Error al obtener las citas: ", error);
    }
  }

  const recuperarClinicas = async ()  => {
    try {
      const data = await ClinicaService.getClinicas();
      setListaClinicas(data)
    } catch (error) {
      console.log("Error al obtener las clinicas: ", error);
    }
  }

  const recuperarPacientes = async () => {
    try {
      const data = await PacienteService.getPacientes();
      setListaPacientes(data);
    } catch (error) {
      console.log("Error al recuperar los pacientes")
    }
  }

  const recuperarDoctores = async () => {
    try {
      const data = await DoctorService.getAll();
      setListaDoctores(data)
    } catch (error) {
      console.log("Error al recuperar los doctores: ", error)
    }
  }
 
  return (
    <div>
      <CitaForm recuperarDoctores={listaDoctores} recuperarPacientes={listaPacientes} recuperarClinicas={listaClinicas} actualizarListaCitas={actualizarListaCitas} modoEditar={false}/>
      <CitaList citasRegistradas={listaCitas}/>
    </div>
  );
};

export default Citas;
