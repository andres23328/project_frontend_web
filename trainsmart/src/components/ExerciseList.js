import React from 'react';

function ExerciseList({ exercises }) {
    return (
        <div>
            <h2>Ejercicios Recomendados</h2>
            <ul>
                {exercises.map((exercise, index) => (
                    <li key={index}>{exercise.name}</li>  // Suponiendo que cada ejercicio tiene un nombre
                ))}
            </ul>
        </div>
    );
}

export default ExerciseList;
