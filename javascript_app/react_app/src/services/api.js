import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Plants API
export const getPlants = () => api.get('/plants');
export const addPlant = (data) => api.post('/plants', data);
export const deletePlant = (id) => api.delete(`/plants/${id}`);

// Characteristics API
export const getCharacteristics = () => api.get('/characteristics');
export const addCharacteristic = (data) => api.post('/characteristics', data);
export const deleteCharacteristic = (id) => api.delete(`/characteristics/${id}`);

// Associations API
export const getAssociations = () => api.get('/associations');
export const addAssociation = (data) => api.post('/associations', data);
export const deleteAssociation = (plant_id, characteristic_id) =>
    api.delete(`/associations/${plant_id}/${characteristic_id}`);

export default api;
