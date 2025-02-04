import axios from 'axios';
import axiosInstance from '../api/axiosConfig';

const apiUrl = '/citas';

  const getCitas = async () =>{
    try {
      const response = await axiosInstance.get(apiUrl);
      console.log("Datos obtenidos:", response.data); // Verifica los datos aquí
      return response.data;
    } catch (error) {
      console.error('Error al obtener las citas:', error);
    }
  };

  const getCitasById = async (id) => {
    try {
      const response = await axiosInstance.get(`${apiUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener la cita por id.")
    }
  }


  const createCita = async (cita) => {
    try {
      const response = await axiosInstance.post(apiUrl, cita);
      return response.data;
    } catch (error) {
      console.error('Error al crear la cita:', error);
    }
  };

  const updateCita = async (cita,id) => {
    try {
      const response = await axiosInstance.put(`${apiUrl}/${id}`, cita);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar la cita:', error);
    }
  };

  const deleteCita = async(id) => {
    try {
      await axiosInstance.delete(`${apiUrl}/${id}`);
    } catch (error) {
      console.error('Error al eliminar la cita:', error);
    }
  };


export default {
  getCitas,
  createCita,
  updateCita,
  deleteCita,
  getCitasById
};
