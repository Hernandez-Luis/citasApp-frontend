import React, { useState, useEffect } from 'react';
import CitaService from '../services/CitaService';
import CitaList from '../components/CitaList';
import CitaForm from '../components/CitaForm';
import ClinicaService from '../services/ClinicaService';
import PacienteService from '../services/PacienteServices';
import DoctorService from '../services/DoctorService';
import Swal from 'sweetalert2';

const Citas = () => {

  const [listaCitas, setListaCitas] = useState([]);
  const [listaClinicas, setListaClinicas] = useState([]);
  const [listaPacientes, setListaPacientes] = useState([]);
  const [listaDoctores, setListaDoctores] = useState([]);
  const [selectedCita, setSelectedCita] = useState(null);
  const [editarCita, setEditarCita] = useState([])

  useEffect(() => {
    actualizarListaCitas();
    recuperarClinicas();
    recuperarPacientes();
    recuperarDoctores();
  }, []);

  const actualizarListaCitas = async () => {
    try {
      const data = await CitaService.getCitas();
      setListaCitas(data);
    } catch (error) {
      console.log("Error al obtener las citas: ", error);
    }
  }

  const recuperarClinicas = async () => {
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

  const handleDeleteCitas = (id) => {
    CitaService.deleteCita(id).then(() => {
      setListaCitas(listaCitas.filter((cita) => cita.id !== id));
    });
    mostrarExito("Cita eliminada de manera exitosa.")
  };

  const handleUpdateCitas = async (id) => {
    console.log("Mostrando resultado: ", id);
    try {
      // Obtener la cita usando el id
      const cita = await CitaService.getCitasById(id);
      setEditarCita(cita)
      console.log("cita",cita)
    } catch (error) {
      console.log("Error al obtener los detalles de la cita:", error);
    }
  };
  

  const crearCita = () => {

  }

  const actualizaCita = (actualizar) => {
    CitaService.updateCita(actualizar, actualizar.id).then((citas) => {
      setListaCitas((prevCitas) =>
        prevCitas.map((c) => (c.id === citas.id ? citas : c))
      );
    });
  }

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
    <div>
      <CitaForm editarCita={editarCita} onSubmit={selectedCita ? actualizaCita : crearCita} cita={selectedCita} recuperarDoctores={listaDoctores} recuperarPacientes={listaPacientes} recuperarClinicas={listaClinicas} actualizarListaCitas={actualizarListaCitas} modoEditar={false} />
      <CitaList citasRegistradas={listaCitas} onSelect={handleUpdateCitas} onDelete={handleDeleteCitas} />
    </div>
  );
};

export default Citas;
