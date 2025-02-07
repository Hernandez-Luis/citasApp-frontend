import axios from 'axios';
import axiosInstance from '../api/axiosConfig';

const apiUrl = '/pacientes';

  const getPacientes = async () =>{
    try {
      const response = await axiosInstance.get(apiUrl);
      console.log("Datos obtenidos:", response.data); // Verifica los datos aquí
      return response.data;
    } catch (error) {
      console.error('Error al obtener los pacientes:', error);
    }
  };

  const getPacientesById = async (id) => {
    try {
      const response = await axiosInstance.get(`${apiUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener el paciente por id.")
    }
  }


  const createPacientes = async (paciente) => {
    try {
      const response = await axiosInstance.post(apiUrl, paciente);
      return response.data;
    } catch (error) {
      console.error('Error al crear el paciente:', error);
    }
  };

  const updatePacientes = async (paciente,id) => {
    try {
      const response = await axiosInstance.put(`${apiUrl}/${id}`, paciente);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar el paciente:', error);
    }
  };

  const deletePacientes = async(id) => {
    try {
      await axiosInstance.delete(`${apiUrl}/${id}`);
    } catch (error) {
      console.error('Error al eliminar el paciente:', error);
    }
  };


export default {
  getPacientes,
  createPacientes,
  updatePacientes,
  deletePacientes,
  getPacientesById
};
