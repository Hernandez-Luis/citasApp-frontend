import React, { useState, useEffect } from 'react';
import CitaService from '../services/CitaService';
import CitaList from '../components/CitaList';
import CitaForm from '../components/CitaForm';

const Citas = () => {

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
 

  return (
    <div>
      <CitaForm actualizarListaCitas={actualizarListaCitas} modoEditar={false}/>
      <CitaList citasRegistradas={listaCitas}/>
    </div>
  );
};

export default Citas;
