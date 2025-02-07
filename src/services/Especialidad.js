import axiosInstance from "../api/axiosConfig"

const API_URL = "/especialidades"

const getAll = async () => {
    try {
        const response = await axiosInstance.get(API_URL);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

const create = async (especialidad) => {
    try {
        const resposne =  await axiosInstance.post(API_URL,especialidad);
        return resposne.data; 
    } catch (error) {
        throw error.response.data;
    }
}

const update = async (id, especialidad) => {
    try {
        const response = await axiosInstance.put(`${API_URL}/${id}`,especialidad);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

const deleteEspecialidad = async (id) => {
    try {
        await axiosInstance.delete(`${API_URL}/${id}`)
    } catch (error) {
        throw error.response.data;
    }
}


export default {
    getAll,
    create,
    update,
    deleteEspecialidad
}