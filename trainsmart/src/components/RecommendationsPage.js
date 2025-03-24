import React, { useState } from 'react';
import Form from './Form';
import getRecommendations from '../services/recommendations'; // Asegúrate de que la ruta sea correcta
import ExerciseList from './ExerciseList'; // Importa el componente ExerciseList

function RecommendationsPage() {
    const [exercises, setExercises] = useState([]); // Estado para almacenar las recomendaciones
    const [loading, setLoading] = useState(false); // Estado para manejar el indicador de carga
    const [error, setError] = useState(null); // Estado para manejar errores

    const handleSubmit = async (userData) => {
        setLoading(true);
        setError(null);
        try {
            // Llamada a la API para obtener las recomendaciones
            const recommendations = await getRecommendations(userData);
            setExercises(recommendations); // Guardamos las recomendaciones en el estado
        } catch (err) {
            console.error('Error obteniendo las recomendaciones:', err);
            setError('Hubo un error obteniendo las recomendaciones. Inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Obtén tus Ejercicios Recomendados</h1>
            <Form onSubmit={handleSubmit} /> {/* Pasamos la función handleSubmit al formulario */}

            {loading && <p>Cargando recomendaciones...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {exercises.length > 0 && <ExerciseList exercises={exercises} />} {/* Mostramos la lista solo si hay recomendaciones */}
        </div>
    );
}

export default RecommendationsPage;
