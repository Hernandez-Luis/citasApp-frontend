import axios from 'axios';
import axiosInstance from '../api/axiosConfig';

const apiUrl = '/clinicas';

  const getClinicas = async () =>{
    try {
      const response = await axiosInstance.get(apiUrl);
      console.log("Datos obtenidos:", response.data); // Verifica los datos aquí
      return response.data;
    } catch (error) {
      console.error('Error al obtener las clinicas:', error);
    }
  };

  const getClinicasById = async (id) => {
    try {
      const response = await axiosInstance.get(`${apiUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener la clinica por id.")
    }
  }


  const createClinicas = async (clinica) => {
    try {
      const response = await axiosInstance.post(apiUrl, clinica);
      return response.data;
    } catch (error) {
      console.error('Error al crear la clinica:', error);
    }
  };

  const updateClinicas = async (clinica,id) => {
    try {
      const response = await axiosInstance.put(`${apiUrl}/${id}`, clinica);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar la clinica:', error);
    }
  };

  const deleteClinicas = async(id) => {
    try {
      await axiosInstance.delete(`${apiUrl}/${id}`);
    } catch (error) {
      console.error('Error al eliminar la clinica:', error);
    }
  };


export default {
  getClinicas,
  createClinicas,
  updateClinicas,
  deleteClinicas,
  getClinicasById
};
