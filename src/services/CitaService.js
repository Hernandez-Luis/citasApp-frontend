import axios from 'axios';

const apiUrl = 'http://localhost:8080/citas';

const CitaService = {
  async getCitas() {
    try {
      const response = await axios.get(apiUrl);
      console.log("Datos obtenidos:", response.data); // Verifica los datos aquí
      return response.data;
    } catch (error) {
      console.error('Error al obtener las citas:', error);
    }
  },

  async getCitaById(id) {
    try {
      const response = await axios.get(`${apiUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener la cita por ID:', error);
    }
  },

  async createCita(cita) {
    try {
      const response = await axios.post(apiUrl, cita);
      return response.data;
    } catch (error) {
      console.error('Error al crear la cita:', error);
    }
  },

  async updateCita(cita) {
    try {
      const response = await axios.put(`${apiUrl}/${cita._id}`, cita);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar la cita:', error);
    }
  },

  async deleteCita(id) {
    try {
      await axios.delete(`${apiUrl}/${id}`);
    } catch (error) {
      console.error('Error al eliminar la cita:', error);
    }
  },
};

export default CitaService;
