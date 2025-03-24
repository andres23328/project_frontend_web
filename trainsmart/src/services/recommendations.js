import axios from 'axios';

// Función para obtener las recomendaciones
const getRecommendations = async (userData) => {
    try {
        // Realiza una solicitud POST a la API del backend
        const response = await axios.post('http://localhost:5000/api/recommendations', userData);
        // Devuelve los datos de las recomendaciones
        return response.data;
    } catch (error) {
        console.error('Error obteniendo recomendaciones:', error);
        throw error;
    }
};

export default getRecommendations;
