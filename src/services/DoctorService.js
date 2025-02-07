import axiosInstance from "../api/axiosConfig";

const API_URL = "/doctores"

const getAll = async () => {
    try {
        const response = await axiosInstance.get(API_URL);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

const create = async (doctor) => {
    try {
        const response = await axiosInstance.post(API_URL,doctor)
        return response.data;
    } catch (error) {
        throw error.repsonse.data;
    }
}

const update = async (id,doctor) => {
    try {
        const response = await axiosInstance.put(`${API_URL}/${id}`,doctor);
        return response.data;
    } catch (error) {
        throw error.repsonse.data;
    }
}

const deleteDoctor = async (id) => {
    try {
        await axiosInstance.delete(`${API_URL}/${id}`);
    } catch (error) {
        throw error.response.data
    }
}

export default {
    getAll,
    create,
    update,
    deleteDoctor
}